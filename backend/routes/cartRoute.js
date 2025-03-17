const express = require('express');
const { 
    addToCart, 
    getCart, 
    removeFromCart 
} = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middleware/auth');
const Cart = require('../models/Cart');

const router = express.Router();

// Cart routes
router.route('/add').post(isAuthenticatedUser, addToCart);
router.route('/').get(isAuthenticatedUser, getCart);
router.route('/remove/:productId').delete(isAuthenticatedUser, removeFromCart);

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: []
      });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add product to cart',
      error: error.message
    });
  }
});

module.exports = router;
