const connection = require('./db/connection');
const { app } = require("./app");
require("dotenv").config();
const port = process.env.PORT || 6352;

// Basic health check endpoint
app.get("/api/health", async(req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

app.get("/testing",async(req,res)=>{
     
    res.send("hello")
})

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        status: false,
        message: err.message || 'Internal server error'
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

connection
    .then(() => {
        console.log("✅ Successfully connected to MongoDB");
        app.listen(port, () => console.log(`🚀 App is running on http://localhost:${port}`));
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    });