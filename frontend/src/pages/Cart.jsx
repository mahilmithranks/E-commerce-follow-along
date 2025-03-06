import React from 'react';

function Cart() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col space-y-4">
          {/* Cart items will be added here */}
          <div className="text-gray-600">Your cart is empty</div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">₹0.00</span>
          </div>
          <button 
            className="w-full mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            disabled
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
