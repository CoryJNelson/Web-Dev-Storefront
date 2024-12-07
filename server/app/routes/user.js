// Route files:
// - Define the endpoints (URLs) of the API
// - Handle CRUD operations (POST, GET, PUT, DELETE)
// - Map endpoints to controller logic

// user.js handles all requests coming in under the /api/users endpoint

// Imports
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// HTTP Requests

// UPDATE USER
router.put("/:id", verifyTokenAndAuth, async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next({ status: 404, message: "User not found..." });
    }
    // console.log("User found:", user);

    if (!req.body.oldPassword) {
        return next({ status: 400, message: "Current password is required for updates..."});
    }

    // check password before updating user
    const comparePassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!comparePassword) {
        return next({ status: 401, message: "Incorrect password..." });
    }
    delete req.body.oldPassword;
    
    // Encrypt password if it is being updated
    if (req.body.newPassword) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.newPassword, salt);
        delete req.body.newPassword;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
        console.log(`User ${updatedUser.username} successfully updated...`);
    } catch (err) {
        next({ status: 500, message: "Failed to update user...", ogError: err });
    }
});

// DELETE USER
// router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json("User successfully deleted...");
//     } catch (err) {
//         next({ status: 500, message: "Failed to delete user...", ogError: err });
//     }
// });

// GET USER
router.get("/find/:id", verifyTokenAndAuth, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc; 
        res.status(200).json(others);
    } catch (err) {
        next({ status: 500, message: "Failed to find user...", ogError: err });
    }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
    const query = req.query.new
    try {
        const users = query 
        ? await User.find().sort({ _id: -1 }).limit(5) 
        : await User.find();
        res.status(200).json(users);
    } catch (err) {
        next({ status: 500, message: "Failed to get all users...", ogError: err });
    }
});

// GET USER METRICS
router.get("/stats", verifyTokenAndAdmin, async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json(data);
    } catch (err) {
        next({ status: 500, message: "Failed to get user stats...", ogError: err });
    }
});

module.exports = router;