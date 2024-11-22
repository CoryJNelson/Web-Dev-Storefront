const mongoose = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: [true, "Username is required..."],
            unique: true,
            trim: true,
            minlength: 6,
            maxlength: 30, 
        },
        email: { 
            type: String, 
            required: [true, "Email is required..."], 
            unique: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: "Invalid email format"
            }, 
        },
        password: { 
            type: String, 
            required: [true, "Password is required..."],
        },
        isAdmin: { type: Boolean, default:false },
    }, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);