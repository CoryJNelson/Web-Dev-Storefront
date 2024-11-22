const express = require("express");

// Import routes
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const productRoute = require("../routes/product");
const cartRoute = require("../routes/cart");
const orderRoute = require("../routes/order");

const router = express.Router();

// Define api endpoints
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/carts", cartRoute);
router.use("/orders", orderRoute);

module.exports = router;