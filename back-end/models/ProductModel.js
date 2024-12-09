const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    category: { type: String, required: true, ref: "Category" },
    name: { type: String, require: true },
    images: [{ type: String }],
    description: { type: String },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative."], // Thêm validation cho quantity
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative."], // Thêm validation cho price
    },
    most_sale: { type: Number },
});

module.exports = model("Product", ProductSchema);
