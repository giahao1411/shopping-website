const { Schema, model } = require("mongoose");
const User = require("./UserModel");

const OrderSchema = new Schema({
    email: { type: String, required: true, ref: "User" },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    totalPrice: { type: Number },
    createdAt: { type: Date, default: Date.now },
    expectedAt: { type: Date },
    deliveredAt: { type: Date },
    orderstatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Delivering", "Delivered", "Cancelled"],
        default: "Pending",
    },
});

// Middleware để tự động cập nhật thông tin username và phone khi lưu đơn hàng
OrderSchema.pre("save", async function (next) {
    try {
        const user = await User.findOne({ email: this.email });

        if (!user) {
            throw new Error("User not found");
        }

        this.username = user.username;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = model("Order", OrderSchema);
