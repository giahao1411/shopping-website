const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");

router.get("/information/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId, "username addresses phones");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Get addresses and phones success",
            username: user.username,
            addresses: user.addresses,
            phones: user.phones,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/count/all", async (req, res) => {
    try {
        const users = await User.countDocuments();
        const products = await Product.countDocuments();
        const orders = await Order.countDocuments();



        return res.status(200).json({
            message: "Get all information success",
            users,
            products,
            orders,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get("/top-user", async (req, res) => {
    try {
        const topUsers = await Order.aggregate([
            {
                $unwind: "$items", // Giải nén mảng items trong mỗi đơn hàng
            },
            {
                $group: {
                    _id: "$userId", // Nhóm theo userId
                    orderCount: { $sum: 1 }, // Đếm tổng số đơn hàng
                    totalSpent: { $sum: "$items.totalPrice" }, // Tổng số tiền đã chi (totalPrice của các sản phẩm trong đơn hàng)
                    totalItems: { $sum: "$items.quantity" }, // Tổng số sản phẩm đã mua
                },
            },
            { $sort: { totalSpent: -1 } }, // Sắp xếp theo tổng chi tiêu giảm dần
            { $limit: 5 }, // Chỉ lấy top 5 người dùng có chi tiêu nhiều nhất
            {
                $lookup: {
                    from: "users", // Kết hợp thông tin người dùng từ bảng "users"
                    localField: "_id", // Trường userId trong bảng Order
                    foreignField: "_id", // Trường _id trong bảng User
                    as: "userDetails",
                },
            },
            { $unwind: "$userDetails" }, // Tách mảng userDetails ra thành đối tượng duy nhất
            {
                $project: {
                    _id: 0,
                    username: "$userDetails.username", // Lấy tên người dùng
                    email: "$userDetails.email", // Lấy email người dùng
                    totalSpent: 1, // Tổng chi tiêu
                    totalItems: 1, // Tổng số sản phẩm
                    orderCount: 1, // Tổng số đơn hàng
                },
            },
        ]);

        return res.status(200).json({
            message: "Get top users success",
            topUsers,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
