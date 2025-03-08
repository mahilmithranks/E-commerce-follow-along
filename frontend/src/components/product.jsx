import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ _id, name, image, description, price, showEditButton }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEdit = () => {
    navigate(`/edit-product/${_id}`);
  };

  const handleViewDetails = () => {
    navigate(`/product/${_id}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('Please login to continue');
      }

      const response = await fetch(
        `http://localhost:6352/api/deleteProduct/${_id}?email=${encodeURIComponent(userEmail)}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete product');
      }

      // Reload the page to refresh the product list
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg flex flex-col justify-between duration-300 ease-in-out max-w-xs">
        <div className="w-full cursor-pointer" onClick={handleViewDetails}>
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-lg mb-3 transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <h2 className="text-md font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600 line-clamp-3 opacity-80">{description}</p>
        </div>
        <div className="w-full mt-3">
          <p className="text-md font-semibold text-gray-900">${price}</p>
          <div className="flex gap-2">
            <button 
              onClick={handleViewDetails}
              className="flex-1 text-white px-4 py-1 mt-2 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
            >
              More Info
            </button>
            {showEditButton && (
              <>
                <button 
                  onClick={handleEdit}
                  className="flex-1 text-white px-4 py-1 mt-2 rounded-md bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button 
                  onClick={() => setShowConfirmation(true)}
                  className="flex-1 text-white px-4 py-1 mt-2 rounded-md bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}