// Route files:
// - Define the endpoints (URLs) of the API
// - Handle CRUD operations (POST, GET, PUT, DELETE)
// - Map endpoints to controller logic

// order.js handles all requests coming in under the /api/orders endpoint

// Imports
const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// HTTP requests

// CREATE ORDER
router.post("/", verifyToken, async (req, res, next) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        next({ status: 500, message: "Failed to create order...", ogError: err });
    }
});

// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        next({ status: 500, message: "Failed to update order...", ogError: err });
    }
});

// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order successfully deleted...");
    } catch (err) {
        next({ status: 500, message: "Failed to delete order...", ogError: err });
    }
});

// GET USER ORDERS
router.get("/user/:id", verifyTokenAndAuth, async (req, res, next) => { 
    try {
        const orders = await Order.find({userId: req.params.id}); //users may have more than one order, return all
        res.status(200).json(orders);
    } catch (err) {
        next({ status: 500, message: "Failed to find user's orders...", ogError: err });
    }
});

// GET ALL USER ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next({ status: 500, message: "Failed to get all users' orders...", ogError: err });
    }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res, next) => {
    const date = new Date();
    const lastMonth = new Date(new Date().setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(date.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { 
                $match: { createdAt: { $gte: prevMonth } } 
            },
            { 
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    totalSales: { $sum: "$sales" }
                }
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        next({ status: 500, message: "Failed to fetch monthly income...", ogError: err });
    }
});

module.exports = router;