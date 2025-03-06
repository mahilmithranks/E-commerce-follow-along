import React from 'react';

function MyProducts() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product list will be added here */}
        <div className="text-gray-600">No products found</div>
      </div>
    </div>
  );
}

export default MyProducts;
