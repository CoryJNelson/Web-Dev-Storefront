// Route files:
// - Define the endpoints (URLs) of the API
// - Handle CRUD operations (POST, GET, PUT, DELETE)
// - Map endpoints to controller logic

// product.js handles all requests coming in under the /api/products endpoint

// Imports
const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// HTTP requests

// ADD PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        next({ status: 500, message: "Failed to add product...", ogError: err });
    }
});

// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        next({ status: 500, message: "Failed to update product...", ogError: err });
    }
});

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product successfully deleted...");
    } catch (err) {
        next({ status: 500, message: "Failed to delete product...", ogError: err });
    }
});

// GET PRODUCT 
router.get("/:id", async (req, res, next) => { 
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        next({ status: 500, message: "Failed to find product...", ogError: err });
    }
}); // No need to verify tokens, we want everyone to see products

// GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
    const qNew = req.query.new; // for sort by new
    const qCtg = req.query.category; // for sort by category
    try {
        let products; // create array

        if(qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if (qCtg) {
            products = await Product.find({
                category: {
                    $in: [qCtg],
                }
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        next({ status: 500, message: "Failed to get products...", ogError: err });
    }
});

module.exports = router;