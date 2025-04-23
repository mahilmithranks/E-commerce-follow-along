import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createOrder, getOrderById, getUserOrders } from "./orderController.js";

const router = express.Router();

// Create a new order
router.post("/", isAuthenticated, createOrder);

// Get order by ID
router.get("/:orderId", isAuthenticated, getOrderById);

// Get all orders for a user
router.get("/", isAuthenticated, getUserOrders);

export default router;
