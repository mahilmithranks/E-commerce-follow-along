const express = require('express');
const { 
    addToCart, 
    getCart, 
    removeFromCart 
} = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

// Cart routes
router.route('/add').post(isAuthenticatedUser, addToCart);
router.route('/').get(isAuthenticatedUser, getCart);
router.route('/remove/:productId').delete(isAuthenticatedUser, removeFromCart);

module.exports = router;
