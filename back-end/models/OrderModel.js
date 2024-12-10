const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            quantity: { type: Number, required: true, min: 1 },
            totalPrice: { type: Number, required: true, min: 0 },
        },
    ],
    totalPrice: { type: Number, required: true, default: 0, min: 0 },
    createdAt: { type: Date, default: Date.now },
    expectedAt: { type: Date },
    deliveredAt: { type: Date },
    orderstatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Delivering", "Delivered", "Cancelled"],
        default: "Pending",
    },
});

OrderSchema.pre("save", function (next) {
    const baseTotal = this.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    const fixedFee = 2; // ship fee $2
    const vat = 0.1 * (baseTotal + fixedFee); // 10% VAT
    this.totalPrice = baseTotal + fixedFee + vat;

    next();
});

module.exports = model("Order", OrderSchema);
