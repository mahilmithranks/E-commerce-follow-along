import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTags } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products/getAllProducts');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      
      const response = await api.post('/api/cart/add', {
        productId,
        quantity: 1
      });

      if (response.data.success) {
        showNotification('Product added to cart!', 'success');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add product to cart';
      showNotification(errorMessage, 'error');
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleBuyNow = async (product) => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      // Add to cart first
      await handleAddToCart(product._id);
      // Then navigate to cart
      navigate('/cart');
    } catch (error) {
      console.error('Error processing buy now:', error);
      showNotification('Failed to process purchase', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Fade out and remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div 
              className="relative cursor-pointer group"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 
                  className="text-xl font-semibold hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.name}
                </h2>
                <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
              </div>

              <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{product.description}</p>

              <div className="flex items-center space-x-2 mb-3">
                <FaTags className="text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <BsBoxSeam className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors duration-300 ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={() => handleBuyNow(product)}
                  disabled={product.stock === 0 || addingToCart[product._id]}
                >
                  Buy Now
                </button>

                <button 
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors duration-300 ${
                    product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : addingToCart[product._id]
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                  onClick={() => handleAddToCart(product._id)}
                  disabled={product.stock === 0 || addingToCart[product._id]}
                >
                  {addingToCart[product._id] ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products available at the moment.
        </div>
      )}
    </div>
  );
}

export default Home; 