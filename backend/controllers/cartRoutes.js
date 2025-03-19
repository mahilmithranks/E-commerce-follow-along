import express from "express";
import { updateCartQuantity, getCartItems, removeFromCart } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/auth.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

const router = express.Router();

// Get cart items
router.get("/", verifyToken, catchAsyncError(getCartItems));

// Update cart quantity
router.put("/quantity", verifyToken, catchAsyncError(updateCartQuantity));

// Remove item from cart
router.delete("/:productId", verifyToken, catchAsyncError(removeFromCart));

export default router; 