const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1, min: 1},
            },
        ],
        amount: { type: Number, required:true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true },
        },
        status: { 
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
    }, {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);