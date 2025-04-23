import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const OrderConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    products: [],
    address: null,
    total: 0,
  });
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get address ID from URL params
    const searchParams = new URLSearchParams(location.search);
    const addressId = searchParams.get("addressId");

    if (!addressId) {
      toast.error("No address selected");
      navigate("/select-address");
      return;
    }

    fetchOrderDetails(addressId);
  }, [location, navigate]);

  const fetchOrderDetails = async (addressId) => {
    try {
      // Fetch cart items
      const cartResponse = await axios.get("http://localhost:8080/api/cart", {
        withCredentials: true,
      });

      // Fetch selected address
      const addressResponse = await axios.get(
        `http://localhost:8080/api/user/address/${addressId}`,
        {
          withCredentials: true,
        }
      );

      // Calculate total
      const products = cartResponse.data.cart;
      const total = products.reduce((sum, item) => {
        return sum + item.productId.price * item.quantity;
      }, 0);

      setOrderDetails({
        products,
        address: addressResponse.data.address,
        total,
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        {
          addressId: orderDetails.address._id,
        },
        { withCredentials: true }
      );

      toast.success("Order placed successfully!");
      navigate(`/order-success/${response.data.orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
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
        <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>

        {/* Products Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          {orderDetails.products.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:8080/products-photo/${item.productId.images[0]}`}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-600">
                    ${item.productId.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="font-semibold">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Address Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          {orderDetails.address && (
            <div className="p-4 border rounded">
              <p>
                {orderDetails.address.address}, {orderDetails.address.area}
              </p>
              <p>
                {orderDetails.address.city}, {orderDetails.address.pincode}
              </p>
              <p>{orderDetails.address.country}</p>
              {orderDetails.address.addressType && (
                <p className="mt-2 inline-block px-2 py-1 bg-gray-200 rounded text-sm">
                  {orderDetails.address.addressType}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg mt-2">
            <span>Total</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="flex justify-end">
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {placingOrder ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
