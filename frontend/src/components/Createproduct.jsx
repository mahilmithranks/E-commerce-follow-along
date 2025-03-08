import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        description: "",
        category: "",
        tags: [],
        price: "",
        stock: "",
        images: [],
        previewImg: []
    });

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            alert('Please login to add products');
            navigate('/login');
            return;
        }
        setFormData(prev => ({ ...prev, email: userEmail }));
    }, [navigate]);

    const handleChange = (e) => {
        if(e.target.name === "tags") {
            let tagArr = e.target.value.split(",");
            let trimmedtagArr = tagArr.map(ele => ele.trim()).filter(tag => tag !== "");
            setFormData({...formData, tags: trimmedtagArr});
        }
        else if (e.target.name === "images") {
            const files = Array.from(e.target.files);
            const imgUrls = files.map(file => URL.createObjectURL(file));
            setFormData(prevState => ({
                ...prevState,
                images: files,
                previewImg: imgUrls
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const { email, name, description, category, tags, price, stock, images } = formData;

        if (!email || !name || !description || !category || !price || !stock) {
            alert("Please fill in all required fields");
            setLoading(false);
            return;
        }

        const multiPartFormData = new FormData();
        multiPartFormData.append("name", name);
        multiPartFormData.append("description", description);
        multiPartFormData.append("category", category);
        multiPartFormData.append("tags", JSON.stringify(tags));
        multiPartFormData.append("price", price);
        multiPartFormData.append("stock", stock);
        multiPartFormData.append("email", email);

        if(Array.isArray(images)) {
            images.forEach(image => {
                multiPartFormData.append("images", image);
            });
        }

        try {
            const response = await axios.post("http://localhost:6352/api/products/createProduct", multiPartFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            if(response.status === 201) {
                alert("Product Created Successfully");
                navigate('/my-products');
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert(error.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    const categoryArr = ["Electronics", "Groceries", "Fashion", "Dairy"];

    return (
        <div className='flex justify-center items-center min-h-screen bg-cover bg-center' style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?office,technology')" }}>
            <div className='w-full max-w-lg bg-white p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Create a New Product</h2>
               
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block font-medium text-gray-700'>Email</label>
                        <input 
                            className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' 
                            type="email" 
                            value={formData.email}
                            placeholder='Enter your email' 
                            name="email" 
                            readOnly 
                        />
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Name</label>
                        <input 
                            className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' 
                            type="text" 
                            placeholder='Enter product name' 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Description</label>
                        <textarea 
                            className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 h-32' 
                            name="description" 
                            value={formData.description}
                            onChange={handleChange} 
                            placeholder="Enter product description"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Category</label>
                        <select 
                            className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' 
                            name="category" 
                            value={formData.category}
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Choose a category</option>
                            {categoryArr.map((ele, index) => (
                                <option key={index} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Tags <span className='text-gray-500 text-sm'>(add multiple tags separated by comma)</span></label>
                        <input 
                            className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' 
                            type="text" 
                            placeholder='e.g., electronics, gadgets, new' 
                            name="tags" 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='flex space-x-4'>
                        <div className='w-1/2'>
                            <label className='block font-medium text-gray-700'>Price</label>
                            <input 
                                className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' 
                                type="number" 
                                name="price" 
                                value={formData.price}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='block font-medium text-gray-700'>Stock</label>
                            <input 
                                className='border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500' 
                                type="number" 
                                name="stock" 
                                value={formData.stock}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block font-medium text-gray-700'>Product Images</label>
                        <input 
                            className='hidden' 
                            type="file" 
                            name="images" 
                            id='upload' 
                            multiple 
                            accept="image/*"
                            onChange={handleChange} 
                            required={formData.images.length === 0}
                        />
                        <label htmlFor="upload" className='cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-700'>
                            <IoIosAddCircleOutline size={24} />
                            <span>Add Images</span>
                        </label>
                    </div>

                    {formData.previewImg.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {formData.previewImg.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt={`Preview ${index + 1}`} 
                                    className='w-20 h-20 object-cover rounded-md shadow-md' 
                                />
                            ))}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md font-semibold transition ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Creating Product...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;