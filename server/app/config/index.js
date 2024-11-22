const express = require("express");

// Import routes
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user"); 

const router = express.Router();

// Define api endpoints
router.use("/auth", authRoute);
router.use("/users", userRoute);

module.exports = router;