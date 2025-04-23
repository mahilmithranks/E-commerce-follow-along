import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addAddress,
  getAddresses,
  getAddressById,
} from "./userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Profile routes
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile", isAuthenticated, updateUserProfile);

// Address routes
router.post("/address", isAuthenticated, addAddress);
router.get("/addresses", isAuthenticated, getAddresses);
router.get("/address/:addressId", isAuthenticated, getAddressById);

export default router;
