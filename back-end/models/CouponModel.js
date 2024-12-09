const { Schema, model } = require("mongoose");
const crypto = require("crypto");

const CouponSchema = new Schema(
  {
    code: { type: String, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["percent", "fixed", "freeship"], required: true },
    value: { type: Number, required: true, min: [0, 'Quantity cannot be negative.'] }, // Giữ value là required
    maxUses: { type: Number, required: true, min: [0, 'Quantity cannot be negative.'] },
    usesCount: { type: Number, default: 0 },
    status: { type: String, enum: ["enabled", "disabled"], default: "enabled" },
  },
  { timestamps: true }
);

// Middleware `pre('save')` để tự động gán giá trị value = 0 khi type = 'freeship'
CouponSchema.pre("save", function (next) {
  if (!this.code) {
    // Tạo mã coupon ngẫu nhiên gồm 5 ký tự
    this.code = crypto.randomBytes(3).toString("hex").toUpperCase();
  }

  // Nếu type là 'freeship', tự động gán value = 0
  if (this.type === "freeship") {
    this.value = 0; // Gán giá trị value = 0 nếu type là 'freeship'
  }

  next();
});

module.exports = model("Coupon", CouponSchema);
