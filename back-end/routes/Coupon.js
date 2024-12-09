const express = require("express");
const router = express.Router();

const Coupon = require("../models/CouponModel"); // Đảm bảo model Coupon đã được import

// API lấy tất cả coupon
router.get("/coupons", async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query;
        const skip = (page - 1) * limit;

        // Lấy tất cả coupon, có phân trang
        const coupons = await Coupon.find().skip(skip).limit(parseInt(limit));

        const totalCoupons = await Coupon.countDocuments();

        res.status(200).json({
            coupons,
            totalPages: Math.ceil(totalCoupons / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons", error });
    }
});


// API lấy thông tin coupon theo mã coupon
router.get("/coupons/:code", async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json(coupon);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching coupon", error });
    }
});


// API tạo coupon mới
router.post("/coupons", async (req, res) => {
  const { name, type, value, maxUses } = req.body;

  // Log dữ liệu nhận được
  console.log("Received data:", req.body);

  // Kiểm tra dữ liệu đầu vào
  if (!name || !type || (type !== "freeship" && !value) || !maxUses) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    // Gán value = 0 nếu type là freeship (được xử lý trong Mongoose)
    if (type === 'freeship' && value !== 0) {
      return res.status(400).json({ message: "Value for 'freeship' type must be 0" });
    }

    const newCoupon = new Coupon({
      name,
      type,
      value,
      maxUses,
    });

    await newCoupon.save();

    return res.status(201).json({
      message: "Coupon created successfully",
      coupon: {
        code: newCoupon.code, // Coupon code tự động sinh ra
        name: newCoupon.name,
        type: newCoupon.type,
        value: newCoupon.value,
        maxUses: newCoupon.maxUses,
        status: newCoupon.status,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});



// Cập nhật trạng thái coupon
router.patch("/coupons/edit/:code", async (req, res) => {
    const { code } = req.params;
    const { status } = req.body;

    if (!["enabled", "disabled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Use 'enabled' or 'disabled'" });
    }

    try {
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        // Cập nhật trạng thái coupon
        coupon.status = status;
        await coupon.save();

        return res.status(200).json({
            message: `Coupon status updated to ${status}`,
            coupon: coupon,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while updating coupon status" });
    }
});


// Xoá coupon theo mã coupon
router.delete("/coupons/delete/:code", async (req, res) => {
    const { code } = req.params;

    try {
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        await coupon.remove(); // Xóa coupon khỏi database

        return res.status(200).json({
            message: `Coupon with code ${code} deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while deleting coupon" });
    }
});


module.exports = router;
