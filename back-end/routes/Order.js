const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");

// Route phân trang đơn hàng
router.get("/orders", async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query; // Lấy thông tin phân trang từ query string
        const skip = (page - 1) * limit;

        // Lấy danh sách đơn hàng với phân trang
        const orders = await Order.find().skip(skip).limit(parseInt(limit)); // Chuyển limit sang kiểu số nguyên

        // Lấy tổng số đơn hàng để tính toán tổng số trang
        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            orders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

// Lấy đơn hàng theo orderid
router.get("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findOne({ orderid: req.params.id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
});

// Tạo đơn hàng mới
router.post("/orders", async (req, res) => {
    try {
        const { email, totalPrice, expectedAt, deliveredAt, orderstatus } =
            req.body;

        if (!email || !totalPrice || !orderstatus || !expectedAt) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Lấy thông tin người dùng từ email (vì email là duy nhất)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Tạo đơn hàng mới mà không cần `orderid`
        const order = new Order({
            email, // Tham chiếu qua email
            username: user.username, // Lấy username từ user
            phone: user.phone, // Lấy phone từ user
            totalPrice,
            expectedAt,
            deliveredAt,
            orderstatus,
        });

        // Lưu đơn hàng vào cơ sở dữ liệu
        await order.save();

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});

// Cập nhật đơn hàng (chỉ admin mới có thể thay đổi trạng thái orderstatus)
router.put("/orders/edit/:id", async (req, res) => {
    try {
        const { orderstatus } = req.body;

        // Kiểm tra nếu chỉ có `orderstatus` được cập nhật
        const allowedFields = ["orderstatus"];
        const fieldsToUpdate = Object.keys(req.body);

        const invalidFields = fieldsToUpdate.filter(
            (field) => !allowedFields.includes(field)
        );
        if (invalidFields.length > 0) {
            return res
                .status(400)
                .json({ message: "Only orderstatus can be updated" });
        }

        const order = await Order.findOne({ orderid: req.params.id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Cập nhật trạng thái của đơn hàng
        order.orderstatus = orderstatus;

        // Lưu lại thông tin thay đổi
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
});

// Xóa đơn hàng (chỉ admin mới có thể xóa)
router.delete("/orders/delete/:id", async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderid: req.params.id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});

module.exports = router;
