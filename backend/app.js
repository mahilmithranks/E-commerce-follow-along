const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"]
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
const errMiddleware = require("./middleware/error");
const productRoute = require("./controllers/productroute");
const userRoute = require("./controllers/userRoute");
const cartRoute = require("./routes/cartRoute");

// Static file serving for uploads
app.use("/upload", express.static(path.join(__dirname, "upload")));

// Routes
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);

// Error handling middleware
app.use(errMiddleware);

module.exports = { app };