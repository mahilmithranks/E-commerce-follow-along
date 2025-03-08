import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:6352/api/getAllProducts`);
        const data = await response.json();
        
        if (data.success) {
          const foundProduct = data.products.find(p => p._id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Product not found');
          }
        } else {
          setError('Failed to fetch product details');
        }
      } catch (err) {
        setError('Error loading product details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex items-center justify-center">
        <div className="text-white">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex items-center justify-center">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex items-center justify-center">
        <div className="text-white">Product not found</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-neutral-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={handlePrevImage}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    →
                  </button>
                </div>
              )}
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="space-y-4">
                <p className="text-4xl font-bold text-indigo-600">
                  ${product.price}
                </p>
                <div className="border-t border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Category</p>
                      <p className="font-medium text-gray-900">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Stock</p>
                      <p className="font-medium text-gray-900">{product.stock} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tags</p>
                      <p className="font-medium text-gray-900">{product.tags}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Seller</p>
                      <p className="font-medium text-gray-900">{product.email}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
