const express = require("express");

// Import routes
const authRoute = require("../routes/auth");

const router = express.Router();

// Define api endpoints
router.use("/auth", authRoute);

module.exports = router;