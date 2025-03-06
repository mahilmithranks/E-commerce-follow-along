import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({ initialData, isEditing }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    price: '',
    stock: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || '',
        tags: initialData.tags || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        images: []
      });
      if (initialData.images) {
        setPreviewImages(initialData.images.map(img => ({ preview: img })));
      }
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));

    // Create preview URLs
    const previews = files.map(file => ({
      preview: URL.createObjectURL(file)
    }));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('Please login to continue');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('email', userEmail);
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => {
            formDataToSend.append('images', image);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = isEditing 
        ? `http://localhost:6352/api/updateProduct/${initialData._id}`
        : 'http://localhost:6352/api/createProduct';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to save product');
      }

      // Redirect to My Products page
      navigate('/myproducts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-neutral-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-indigo-500"
            accept="image/*"
          />
        </div>

        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previewImages.map((image, index) => (
              <img
                key={index}
                src={image.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded ${
            loading
              ? 'bg-neutral-600'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white transition-colors duration-300`}
        >
          {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
