import React, { useState, useEffect } from 'react';
import ProductCard from "../components/product";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          setError('Please login to view your products');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:6352/api/getUserProducts/${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex items-center justify-center">
        <div className="text-white">Loading your products...</div>
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

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">My Products</h1>
        {products.length === 0 ? (
          <div className="text-white text-center">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product._id}
                _id={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.images[0]}
                showEditButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
