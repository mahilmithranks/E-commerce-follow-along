import { useState, useEffect } from "react";
import ProductCard from "../components/product";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:6352/api/getAllProducts');
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex items-center justify-center">
        <div className="text-white">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-neutral-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
        {products.map((product) => (
          <ProductCard 
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
}