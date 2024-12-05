// Route files:
// - Define the endpoints (URLs) of the API
// - Handle CRUD operations (POST, GET, PUT, DELETE)
// - Map endpoints to controller logic

// cart.js handles all requests coming in under the /api/carts endpoint

// Imports
const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// HTTP requests

// CREATE CART
router.post("/", verifyToken, async (req, res, next) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        next({ status: 500, message: "Failed to create cart...", ogError: err });
    }
});

// UPDATE CART
router.put("/:userId", verifyTokenAndAuth("userId"), async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        next({ status: 500, message: "Failed to update cart...", ogError: err });
    }
});

// DELETE CART
// router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
//     try {
//         await Cart.findByIdAndDelete(req.params.id);
//         res.status(200).json("Cart successfully deleted...");
//     } catch (err) {
//         next({ status: 500, message: "Failed to delete cart...", ogError: err });
//     }
// });

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuth("userId"), async (req, res, next) => { 
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (err) {
        next({ status: 500, message: "Failed to find cart...", ogError: err });
    }
});

// GET ALL USER CARTS
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        next({ status: 500, message: "Failed to get all user carts...", ogError: err });
    }
});

module.exports = router;