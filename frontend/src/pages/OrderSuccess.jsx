import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      navigate("/");
    }
  }, [orderId, navigate]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          withCredentials: true,
        }
      );
      setOrderDetails(response.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <p className="text-gray-800 font-semibold mb-6">
            Order ID: <span className="font-bold">{orderId}</span>
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
