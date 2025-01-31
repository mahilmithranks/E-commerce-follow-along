import React, { useState } from "react";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="max-w-md mx-auto p-5 border rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Login to your account</h2>

      {/* Home and Login Buttons */}
      <div className="flex justify-between mb-4">
        <a
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Home
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </a>
      </div>

      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email address</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full p-2 border rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
            >
              {passwordVisible ? "👁️" : "🙈"}
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" id="rememberMe" className="mr-2" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <div className="mb-4">
          <a href="/forgot-password" className="text-blue-500">Forgot your password?</a>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <p className="mt-4">
        Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
