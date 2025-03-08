const Cart = require('../models/cartModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../model/productModel');

// Add/Update product in cart
exports.addToCart = catchAsyncError(async (req, res, next) => {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    // Check if product is in stock
    if (product.stock < quantity) {
        return res.status(400).json({
            success: false,
            message: 'Product quantity exceeds available stock'
        });
    }

    // Find cart for the current user
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        // If cart doesn't exist, create a new one
        cart = await Cart.create({
            user: req.user._id,
            products: [{ product: productId, quantity }]
        });
    } else {
        // If cart exists, check if product exists in cart
        const productIndex = cart.products.findIndex(
            item => item.product.toString() === productId
        );

        if (productIndex > -1) {
            // If product exists, update quantity
            cart.products[productIndex].quantity = quantity;
        } else {
            // If product doesn't exist, add new product
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
    }

    // Populate product details and return cart
    await cart.populate('products.product');

    res.status(200).json({
        success: true,
        cart
    });
});

// Get cart
exports.getCart = catchAsyncError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate('products.product');

    if (!cart) {
        return res.status(200).json({
            success: true,
            cart: {
                products: [],
                totalPrice: 0
            }
        });
    }

    res.status(200).json({
        success: true,
        cart
    });
});

// Remove product from cart
exports.removeFromCart = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found'
        });
    }

    // Remove product from cart
    cart.products = cart.products.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('products.product');

    res.status(200).json({
        success: true,
        cart
    });
}); 