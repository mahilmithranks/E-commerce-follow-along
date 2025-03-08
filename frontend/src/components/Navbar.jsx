import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            E-Commerce
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/my-products" className="text-gray-700 hover:text-blue-600 transition flex items-center">
                  <FaStore className="mr-1" />
                  My Products
                </Link>
                <Link to="/create-product" className="text-gray-700 hover:text-blue-600 transition">
                  Add Product
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition flex items-center">
                  <FaShoppingCart className="mr-1" />
                  Cart
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition"
                  >
                    <FaUser className="mr-1" />
                    {user.name}
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/my-products" className="block py-2 text-gray-700 hover:text-blue-600 transition">
                  My Products
                </Link>
                <Link to="/create-product" className="block py-2 text-gray-700 hover:text-blue-600 transition">
                  Add Product
                </Link>
                <Link to="/cart" className="block py-2 text-gray-700 hover:text-blue-600 transition">
                  Cart
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link to="/signup" className="block py-2 text-gray-700 hover:text-blue-600 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 