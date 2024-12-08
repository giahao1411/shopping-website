const express = require("express");
const router = express.Router();

const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

router.get("/carts/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const carts = await Cart.findOne({ userId }).populate(
            "items.productId",
            "name"
        );

        return res
            .status(200)
            .json({ message: "Get carts successfully", carts: carts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/carts", async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const product = await Product.findById({ productId });
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }

        // check if remaining product
        if (product.quantity < quantity) {
            return res
                .status(400)
                .json({ message: "Not enough product in stock" });
        }

        // update product quantity if remaining
        product.quantity -= quantity;
        await product.save();

        let cart = await Cart.findById({ userId });
        if (!cart) {
            // create a new cart if not existed
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        quantity,
                        totalPrice: product.price * quantity,
                    },
                ],
            });
        } else {
            // check if item already existed in cart
            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            // increase the current quantity if existed item
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * product.price;
            } else {
                // create new items
                cart.items.push({
                    productId,
                    quantity,
                    totalPrice: product.price * quantity,
                });
            }
        }
        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
