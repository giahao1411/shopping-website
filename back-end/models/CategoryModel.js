const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    type: { type: String, required: true, unique: true },
    amount: { type: Number, default: 0 },
});

module.exports = model("Category", CategorySchema);
