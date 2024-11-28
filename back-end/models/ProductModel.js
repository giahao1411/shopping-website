const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    category: { type: String, require: true },
    name: { type: String, require: true },
    images: [{ type: String }],
    description: { type: String },
    quantity: { type: Number, require: true },
    price: { type: Number, require: true },
    most_sale: { type: Number },
});

module.exports = model("Product", ProductSchema);
