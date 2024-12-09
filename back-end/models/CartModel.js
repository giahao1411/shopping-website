const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            quantity: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            isCheckout: {
                type: String,
                enum: ["inCart", "checkout"],
                default: "inCart",
            },
        },
    ],
});

module.exports = model("Cart", CartSchema);
