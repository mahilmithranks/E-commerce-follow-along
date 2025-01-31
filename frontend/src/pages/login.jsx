import React from 'react';
  // Import the CSS file

function Login() {
  
    return (
      <div className="max-w-md mx-auto p-5 border rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Login to your account</h2>
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
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
          />
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
};
  
export default Login;