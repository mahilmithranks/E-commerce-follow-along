import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  cancelOrder,
} from "./orderController.js";

const router = express.Router();

// Create a new order
router.post("/", isAuthenticated, createOrder);

// Get order by ID
router.get("/:orderId", isAuthenticated, getOrderById);

// Get all orders for a user
router.get("/", isAuthenticated, getUserOrders);

// Create a new order with user email
router.post("/placeOrder", isAuthenticated, placeOrder);

// Route to get all orders for a user by email
router.get("/orders/:email", getUserOrdersByEmail);

// Cancel an order
router.put("/:orderId/cancel", isAuthenticated, cancelOrder);

export default router;
