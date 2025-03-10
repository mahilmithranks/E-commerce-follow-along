const express = require("express");
const UserModel = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const userRoute = express.Router();
const { upload } = require("../middleware/multer");
const crypto = require('crypto');

// Health check endpoint
userRoute.get("/health", (req, res) => {
  res.status(200).json({ status: true, message: "User service is healthy" });
});

// Generate random reset token
const generateResetToken = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

// Store reset tokens (in production, use Redis or database)
const resetTokens = new Map();

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

      // Create token for automatic login after signup
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
        expiresIn: "30d",
      });

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      res.status(201).json({ 
        status: true, 
        message: "Registration successful",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        token
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

    // Set cookie with appropriate options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Send response with user details
    res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  })
);

// Add a logout route
userRoute.post(
  "/logout",
  catchAsyncError(async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.status(200).json({
      status: true,
      message: "Logged out successfully"
    });
  })
);

// Get current user details
userRoute.get(
  "/me",
  catchAsyncError(async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await UserModel.findById(decoded.id).select("-password");

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        status: true,
        user
      });
    } catch (error) {
      return next(new ErrorHandler("Invalid token", 401));
    }
  })
);

// Forgot Password
userRoute.post("/forgot-password", catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Generate reset token
  const resetToken = generateResetToken();
  
  // Store token with expiry (15 minutes)
  resetTokens.set(email, {
    token: resetToken,
    expiresAt: Date.now() + 15 * 60 * 1000 // 15 minutes
  });

  // Send reset token via email
  const resetEmail = {
    to: email,
    subject: "Password Reset Verification Code",
    html: `
      <h1>Password Reset Request</h1>
      <p>Your verification code is: <strong>${resetToken}</strong></p>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  try {
    await sendMail(resetEmail);
    res.status(200).json({
      success: true,
      message: "Password reset verification code sent to your email"
    });
  } catch (error) {
    resetTokens.delete(email);
    return next(new ErrorHandler("Email could not be sent", 500));
  }
}));

// Verify reset token
userRoute.post("/verify-reset-token", catchAsyncError(async (req, res, next) => {
  const { email, token } = req.body;

  const resetData = resetTokens.get(email);
  if (!resetData) {
    return next(new ErrorHandler("Reset token has expired or is invalid", 400));
  }

  if (Date.now() > resetData.expiresAt) {
    resetTokens.delete(email);
    return next(new ErrorHandler("Reset token has expired", 400));
  }

  if (resetData.token !== token) {
    return next(new ErrorHandler("Invalid reset token", 400));
  }

  res.status(200).json({
    success: true,
    message: "Token verified successfully"
  });
}));

// Reset Password
userRoute.post("/reset-password", catchAsyncError(async (req, res, next) => {
  const { email, token, newPassword } = req.body;

  const resetData = resetTokens.get(email);
  if (!resetData || resetData.token !== token) {
    return next(new ErrorHandler("Invalid reset token", 400));
  }

  if (Date.now() > resetData.expiresAt) {
    resetTokens.delete(email);
    return next(new ErrorHandler("Reset token has expired", 400));
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  // Clear used token
  resetTokens.delete(email);

  // Send confirmation email
  const confirmationEmail = {
    to: email,
    subject: "Password Reset Successful",
    html: `
      <h1>Password Reset Successful</h1>
      <p>Your password has been successfully reset.</p>
      <p>If you didn't make this change, please contact support immediately.</p>
    `
  };

  try {
    await sendMail(confirmationEmail);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }

  res.status(200).json({
    success: true,
    message: "Password reset successful"
  });
}));

module.exports = userRoute;
