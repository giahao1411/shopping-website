const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phones: { type: [String], default: [] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    status: { type: String, enum: ["active", "banned"], default: "active" },
    addresses: { type: [String], default: [] },

    // Mảng lưu coupon đã áp dụng
    coupons: [
        {
            code: { type: String, ref: "Coupon" }, // Tham chiếu coupon qua code
            quantity: { type: Number, default: 0, min: 0 }, // Số lần người dùng sử dụng coupon này
        }
    ],
});

// Hash password before saving to database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

// Kiểm tra mật khẩu
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Cập nhật coupon khi người dùng áp dụng
UserSchema.methods.useCoupon = async function (couponCode) {
    // Kiểm tra xem coupon có trong mảng coupons của người dùng không
    const couponIndex = this.coupons.findIndex((coupon) => coupon.code === couponCode);

    if (couponIndex > -1) {
        this.coupons[couponIndex].quantity += 1; // Nếu coupon đã tồn tại, tăng số lần sử dụng
    } else {
        this.coupons.push({ code: couponCode, quantity: 1 }); // Nếu chưa tồn tại, thêm mới
    }

    await this.save();
};

module.exports = model("User", UserSchema);
