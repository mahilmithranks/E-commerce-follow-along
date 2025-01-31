import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt } from "react-icons/fa"; // Importing icons

function Navbar() {
  return (
    <ul className="flex justify-center space-x-6 mt-4">
      <li>
        <Link to="/" className="text-gray-800 flex items-center space-x-2 hover:text-gray-500">
          <FaHome /> <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-gray-800 flex items-center space-x-2 hover:text-gray-500">
          <FaSignInAlt /> <span>Login</span>
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
