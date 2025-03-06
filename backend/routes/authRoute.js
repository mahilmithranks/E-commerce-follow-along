const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticatedUser, getUserProfile);

module.exports = router;
