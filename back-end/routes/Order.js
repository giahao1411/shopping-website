const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");

router.get("/orders", async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query;
        const skip = (page - 1) * limit;

        const orders = await Order.find().skip(skip).limit(parseInt(limit));

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

router.post("/orders", async (req, res) => {
    const {
        email,
        username,
        phone,
        address,
        totalPrice,
        expectedAt,
        orderstatus,
    } = req.body;

    if (
        !username ||
        !phone ||
        !address ||
        !totalPrice ||
        !orderstatus ||
        !expectedAt
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const order = new Order({
            email,
            username,
            phone,
            totalPrice,
            expectedAt,
            orderstatus,
        });

        await order.save();

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});

router.patch("/orders/edit/:id", async (req, res) => {
    try {
        const { orderstatus } = req.body;
        console.log("Updating order status:", orderstatus);

        if (!orderstatus) {
            return res
                .status(400)
                .json({ message: "Order status is required" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.expectedAt = null;
        order.deliveredAt = null;

        const currentDate = new Date();

        switch (orderstatus) {
            case "Confirmed":
                order.expectedAt = new Date(
                    currentDate.setDate(currentDate.getDate() + 3)
                );
                break;
            case "Cancelled":
                order.expectedAt = null;
                break;
            case "Delivering":
                order.expectedAt = new Date(
                    currentDate.setDate(currentDate.getDate() + 2)
                );
                break;
            case "Delivered":
                order.expectedAt = currentDate;
                order.deliveredAt = currentDate;
                break;
            case "Pending":
                order.expectedAt = null;
                break;
            default:
                return res
                    .status(400)
                    .json({ message: "Invalid order status provided" });
        }

        order.orderstatus = orderstatus;

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: error.message });
    }
});

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
