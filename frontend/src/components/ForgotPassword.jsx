import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: verification code, 3: new password
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/api/user/forgot-password', { email });
      
      if (response.data.success) {
        setStep(2);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/api/user/verify-reset-token', {
        email,
        token: verificationCode.toUpperCase()
      });
      
      if (response.data.success) {
        setStep(3);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/api/user/reset-password', {
        email,
        token: verificationCode,
        newPassword
      });
      
      if (response.data.success) {
        alert('Password reset successful! Please login with your new password.');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800">
      <div className="w-full sm:w-[400px] bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Enter Verification Code'}
          {step === 3 && 'Reset Password'}
        </h1>

        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a verification code.
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerificationSubmit}>
            <p className="text-gray-600 mb-4">
              We've sent a verification code to {email}. Please enter it below.
            </p>
            <div className="mb-4">
              <label htmlFor="code" className="block text-gray-600 font-medium mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest uppercase"
                maxLength={6}
                placeholder="XXXXXX"
                disabled={loading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <p className="text-gray-600 mb-4">
              Please enter your new password.
            </p>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-600 font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 