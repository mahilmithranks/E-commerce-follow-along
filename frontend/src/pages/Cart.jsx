import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartItem = ({ product, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
          onClick={() => onQuantityChange(product._id, -1)}
        >
          -
        </button>
        <span className="w-8 text-center">{product.quantity}</span>
        <button
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
          onClick={() => onQuantityChange(product._id, 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCartItems(response.data.items);
      calculateTotal(response.data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    try {
      await axios.put(`/api/cart/${productId}`, { delta });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalAmount.toFixed(2));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                product={item}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <div className="text-gray-600">Your cart is empty</div>
          )}
        </div>
        
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">₹{total}</span>
          </div>
          <button 
            className="w-full mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
