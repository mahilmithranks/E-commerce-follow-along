const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Import routes
const errMiddleware = require("./middleware/error");
const productRoute = require("./controllers/productroute");
const userRoute = require("./controllers/userRoute");

// Static file serving
app.use("/upload", express.static("upload"));

// Routes
app.use("/api/products", productRoute);
app.use("/user", userRoute);

// Error handling
app.use(errMiddleware);

module.exports = { app };