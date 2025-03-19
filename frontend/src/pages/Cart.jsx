import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CartProduct = ({ product, onQuantityChange, onRemove, isUpdating }) => {
    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1) {
            toast.error('Quantity cannot be less than 1');
            return;
        }
        
        if (newQuantity > product.stock) {
            toast.error(`Only ${product.stock} items available in stock`);
            return;
        }
        
        try {
            await onQuantityChange(product._id, newQuantity);
            toast.success('Quantity updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update quantity');
        }
    };

    const handleRemove = async () => {
        try {
            await onRemove(product._id);
            toast.success('Product removed from cart');
        } catch (error) {
            toast.error('Failed to remove product');
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4">
            <div className="flex items-center space-x-4">
                <img 
                    src={`http://localhost:8080/products-photo/${product.images[0]}`} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => handleQuantityChange(product.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.quantity <= 1 || isUpdating}
                    >
                        -
                    </button>
                    <span className="w-8 text-center font-medium">{product.quantity}</span>
                    <button 
                        onClick={() => handleQuantityChange(product.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.quantity >= product.stock || isUpdating}
                    >
                        +
                    </button>
                </div>
                <button 
                    onClick={handleRemove}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isUpdating}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        // Calculate total whenever products change
        const newTotal = products.reduce((sum, item) => {
            return sum + (item.productId.price * item.quantity);
        }, 0);
        setTotal(newTotal);
    }, [products]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cart', {
                withCredentials: true
            });
            setProducts(response.data.cart);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Failed to load cart items');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        setUpdating(true);
        try {
            await axios.put('http://localhost:8080/api/cart/quantity', 
                { productId, quantity: newQuantity },
                { withCredentials: true }
            );
            // Refresh cart items after update
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
            throw error;
        } finally {
            setUpdating(false);
        }
    };

    const handleRemove = async (productId) => {
        setUpdating(true);
        try {
            await axios.delete(`http://localhost:8080/api/cart/${productId}`, {
                withCredentials: true
            });
            // Refresh cart items after removal
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item:', error);
            throw error;
        } finally {
            setUpdating(false);
        }
    };

    const handleCheckout = () => {
        // Navigate to checkout page (to be implemented)
        toast.info('Checkout functionality coming soon!');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                
                {products.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow text-center">
                        <p className="text-gray-600 mb-4">Your cart is empty</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {products.map((item) => (
                            <CartProduct 
                                key={item._id} 
                                product={item.productId}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                                isUpdating={updating}
                            />
                        ))}
                        <div className="bg-white p-6 rounded-lg shadow mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-xl font-bold">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Continue Shopping
                                </button>
                                <button 
                                    onClick={handleCheckout}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;