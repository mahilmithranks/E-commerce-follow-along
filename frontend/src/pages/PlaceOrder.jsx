import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const PlaceOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchSelectedAddress();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cart", {
        withCredentials: true,
      });
      setCartItems(response.data.items);
      calculateTotalValue(response.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items");
    }
  };

  const fetchSelectedAddress = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/selected-address",
        {
          withCredentials: true,
        }
      );
      setSelectedAddress(response.data.address);
    } catch (error) {
      console.error("Error fetching selected address:", error);
      toast.error("Failed to load selected address");
    }
  };

  const calculateTotalValue = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalValue(total);
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        {
          items: cartItems,
          address: selectedAddress,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully");
        navigate(`/order-success/${response.data.orderId}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Place Order</h1>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalValue}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          {selectedAddress ? (
            <div>
              <p>
                {selectedAddress.street}, {selectedAddress.city},{" "}
                {selectedAddress.state}, {selectedAddress.zipCode}
              </p>
              <p>{selectedAddress.country}</p>
            </div>
          ) : (
            <p>No address selected</p>
          )}
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
