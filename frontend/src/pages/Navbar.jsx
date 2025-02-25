import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-2 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Home Button */}
        <Link
          to="/"
          className="text-gray-800 text-lg font-semibold py-1 px-4 rounded-full border-2 border-gray-800 bg-transparent hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          HOME
        </Link>

        {/* Login Button */}
        <Link
          to="/login"
          className="text-gray-800 text-lg font-semibold py-1 px-4 rounded-full border-2 border-gray-800 bg-transparent hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;