import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import api from '../utils/axios';

function CreateProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
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
        // Check authentication
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
            navigate('/login');
            return;
        }
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
        const { name, description, category, tags, price, stock, images } = formData;

        if (!name || !description || !category || !price || !stock || !images.length) {
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

        if(Array.isArray(images)) {
            images.forEach(image => {
                multiPartFormData.append("images", image);
            });
        }

        try {
            const response = await api.post("/api/products/createProduct", multiPartFormData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if(response.data.success) {
                alert("Product Created Successfully");
                navigate('/my-products');
            }
        } catch (error) {
            console.error("Error creating product:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                alert(error.response?.data?.message || "Failed to create product");
            }
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
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            rows="4"
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            required
                        >
                            <option value="">Select Category</option>
                            {categoryArr.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags.join(", ")}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            placeholder="e.g. electronics, gadget, smartphone"
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Images</label>
                        <div className='flex items-center justify-center w-full'>
                            <label className='w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300'>
                                <IoIosAddCircleOutline className='w-8 h-8'/>
                                <span className='mt-2 text-base leading-normal'>Select Images</span>
                                <input
                                    type='file'
                                    name="images"
                                    className='hidden'
                                    multiple
                                    accept="image/*"
                                    onChange={handleChange}
                                    required={formData.images.length === 0}
                                />
                            </label>
                        </div>
                        {formData.previewImg.length > 0 && (
                            <div className='mt-4 grid grid-cols-3 gap-4'>
                                {formData.previewImg.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className='w-full h-24 object-cover rounded'
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold ${
                            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        } transition-colors duration-300`}
                    >
                        {loading ? 'Creating Product...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;