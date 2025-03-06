const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle CORS errors
  if (err.name === "TypeError" && err.message.includes("CORS")) {
    err.statusCode = 403;
    err.message = "CORS error: Request blocked by CORS policy";
  }

  // Handle network errors
  if (err.code === "ECONNREFUSED" || err.code === "ERR_NETWORK") {
    err.statusCode = 503;
    err.message = "Server is not responding. Please try again later.";
  }

  // Log error for debugging
  console.error("Error:", {
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  });
  
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};