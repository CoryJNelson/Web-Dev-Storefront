// Route files:
// - Define the endpoints (URLs) of the API
// - Handle CRUD operations (POST, GET, PUT, DELETE)
// - Map endpoints to controller logic

// auth.js handles all requests coming in under the /api/auth endpoint

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// HTTP requests

// REGISTER a User
router.post("/register", async (req, res, next) => {
    try {
        // Generate salt - unique to every password
        const salt = await bcrypt.genSalt(10);

        // Hash the password - never save raw password to database
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save user to the database
        const savedUser = await newUser.save();
        console.log(`User ${savedUser.username} successfully registered...`);
        res.status(201).json(savedUser);
    } catch (err) {
        next({ status: 500, message: "Failed to register user...", ogError: err });
    }
});

// LOGIN
router.post("/login", async (req, res, next) => {
    try {
        // check username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            // use return - else function will continue and send a second response
            return next({ status: 401, message: "User not found..." });
        }

        // check password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return next({ status: 401, message: "Incorrect password..." });
        }

        // assign token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_KEY,
            { expiresIn: "3d" },
        );

        // destructure user object - password contains password, others contains all other fields
        const { password, ...others } = user._doc;

        // respond with destructured user and token
        res.status(200).json({ ...others, token });
        console.log(`User ${user.username} successfully signed in...`);
    } catch (err) {
        next({ status: 500, message: "Failed to sign in user...", ogError: err });
    }
});

module.exports = router;