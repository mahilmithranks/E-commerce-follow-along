import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHide = () => {
    setHide(!hide);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = data;
    
    // Validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await api.post("/api/user/login", {
        email,
        password,
      });

      if (response.data.status) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        // Clear form
        setData({
          email: "",
          password: "",
        });

        // Redirect based on role
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else if (response.data.user.role === 'seller') {
          navigate('/seller');
        } else {
          navigate('/');
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-neutral-800">
        <div className="w-full sm:w-[400px] bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h1>

          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleForm}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={hide ? "password" : "text"}
              value={data.password}
              onChange={handleForm}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleHide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {hide ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={props.x}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;