const express = require("express");
const UserModel = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const userRoute = express.Router();
const { upload } = require("../middleware/multer");

// Health check endpoint
userRoute.get("/health", (req, res) => {
  res.status(200).json({ status: true, message: "User service is healthy" });
});

userRoute.post(
  "/signup",
  catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return next(new ErrorHandler("Name, email and password required", 400));
    }

    let user = await UserModel.findOne({ email: email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ 
        name, 
        email, 
        password: hashedPassword,
        isActivated: true // Temporarily set to true for testing
      });

      await newUser.save();

      res.status(201).json({ 
        status: true, 
        message: "Registration successful",
        user: {
          name: newUser.name,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      return next(new ErrorHandler("Registration failed: " + error.message, 500));
    }
  })
);

userRoute.get(
  "/activation/:token",
  catchAsyncError(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
      return next(new ErrorHandler("Token not found", 404));
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      await UserModel.findByIdAndUpdate(decoded.id, { isActivated: true });
      res.redirect("http://localhost:5173/login");
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 400));
    }
  })
);

userRoute.post(
  "/upload",
  upload.single("photo"),
  catchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("File not found", 400));
    }

    res.status(200).json({ status: true, message: "Upload successful" });
  })
);

userRoute.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (!user.isActivated) {
      return next(new ErrorHandler("Please activate your account", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    // Set cookie with SameSite and Secure options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });
  })
);

module.exports = userRoute;
