import { useNavigate } from 'react-router-dom';

export default function ProductCard({ _id, name, image, description, price, showEditButton }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-product/${_id}`);
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-lg flex flex-col justify-between duration-300 ease-in-out max-w-xs">
      <div className="w-full">
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
          <button className="flex-1 text-white px-4 py-1 mt-2 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out">
            More Info
          </button>
          {showEditButton && (
            <button 
              onClick={handleEdit}
              className="flex-1 text-white px-4 py-1 mt-2 rounded-md bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300 ease-in-out"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}