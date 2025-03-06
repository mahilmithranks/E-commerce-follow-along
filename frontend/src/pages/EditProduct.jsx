import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          throw new Error('Please login to continue');
        }

        const response = await fetch(`http://localhost:6352/api/getUserProducts/${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        
        if (!data.success) {
          throw new Error('Failed to fetch product');
        }

        const productToEdit = data.products.find(p => p._id === id);
        if (!productToEdit) {
          throw new Error('Product not found');
        }

        setProduct(productToEdit);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  return (
    <div className="w-full min-h-screen bg-neutral-800 py-8">
      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
}
