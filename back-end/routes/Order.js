const express = require("express");
const router = express.Router();

const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

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
        res.status(500).json({ message: error.message });
    }
});

router.get("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.productId")
            .exec();

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ order: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/orders/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 8 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const orders = await Order.find({ userId })
            .populate("items.productId") // Populate product details for each item
            .skip(skip)
            .limit(parseInt(limit));

        const totalOrders = await Order.countDocuments({ userId });

        res.status(200).json({
            orders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Error fetching orders" });
    }
});

router.post("/orders/:userId", async (req, res) => {
    const { userId } = req.params;
    const { username, phone, address, cartItems } = req.body;

    if (!username || !phone || !address) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // check user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // get user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = new Order({
            userId,
            username,
            phone,
            address,
            items: cartItems,
        });
        await order.save();

        cart.items = cart.items.filter(
            (item) => item.isCheckout !== "checkout"
        );
        await cart.save();

        res.status(200).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
                // restore product's quantity in cart items
                for (const item of order.items) {
                    const product = await Product.findById(item.productId);
                    if (product) {
                        product.quantity += item.quantity;
                        await product.save();
                    }
                }
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
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
