import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [hided, setHided] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleHide = () => {
    setHide(!hide);
  };
  const handleHided = () => {
    setHided(!hided);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleForm = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmpass } = data;
    
    // Validation
    if (!name || !email || !password || !confirmpass) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmpass) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await api.post(
        "/user/signup",
        {
          name,
          email,
          password,
        }
      );

      if (response.data.status) {
        setSuccess(true);
        setError("");
        // Clear form
        setData({
          name: "",
          email: "",
          password: "",
          confirmpass: "",
        });
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
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
            Create an Account
          </h1>

          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-200 text-green-800 p-4 rounded-md mb-4 text-center">
              Registration successful! Please check your email to activate your account.
              <button 
                onClick={props.x}
                className="block w-full mt-2 text-green-700 underline hover:text-green-800"
              >
                Go to Login
              </button>
            </div>
          )}

          {!success && (
            <>
              <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={data.name}
                onChange={handleForm}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

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

              <label htmlFor="confirmpass" className="block text-gray-600 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmpass"
                  name="confirmpass"
                  type={hided ? "password" : "text"}
                  value={data.confirmpass}
                  onChange={handleForm}
                  className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleHided}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {hided ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
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
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={props.x}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign in
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;