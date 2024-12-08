const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required:true, unique:true },
        desc: { 
            type: String, 
            required:true,
            maxlength: [200, "Description is limited to 200 characters..."],
        },
        category: { type: Array },
        pack: { 
            type: String,
            enum: ['6-pack','12-pack','24-pack'],
            required: true,
        },
        price: { 
            type: Number, 
            required:true,
            min: [0, "Price cannot be negative"],
        },
    }, {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);