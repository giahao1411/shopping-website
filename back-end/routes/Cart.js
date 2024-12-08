const express = require("express");
const router = express.Router();

const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

router.get("/carts/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const carts = await Cart.findOne({ userId }).populate(
            "items.productId",
            "name price quantity"
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
        const product = await Product.findById(productId);
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

        let cart = await Cart.findOne({ userId });
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

router.patch("/carts/:userId/update/:productId", async (req, res) => {
    const { userId, productId } = req.params;
    const { newQuantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // find product in items array
        const item = cart.items.find(
            (item) => item.productId.toString() === productId
        );
        if (!item) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        // check if the new quantity exceeds the available stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (newQuantity > product.quantity + item.quantity) {
            return res
                .status(400)
                .json({ message: "Not enough product in stock" });
        }

        // update the quantity of product
        const quantityDifference = newQuantity - item.quantity;
        product.quantity -= quantityDifference;
        await product.save();

        // update cart total price
        item.quantity = newQuantity;
        item.totalPrice = item.quantity * product.price;
        await cart.save();

        return res
            .status(200)
            .json({ message: "Cart update successfully", cart: cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/carts/:userId/delete/:productId", async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // find item index to remove out the item array
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (itemIndex === -1) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
