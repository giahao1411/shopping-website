const express = require("express");
const router = express.Router();
const fs = require("fs");

const Product = require("../models/ProductModel");
const upload = require("../middlewares/multer");

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/products", upload.array("images", 3), async (req, res) => {
    try {
        const { category, name, description, quantity, price } = req.body;
        const images = req.files;

        if (!category || !name || !quantity || !price) {
            return res
                .status(400)
                .json({ message: "Fill all the required fields!" });
        }

        // image and description are optional for a product
        const newProduct = new Product({
            category,
            name,
            images: images.map((image) => image.path),
            description,
            quantity,
            price,
            most_sale: 0,
        });

        await newProduct.save();
        return res
            .status(200)
            .json({ message: "Add product successfully", product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch(
    "/products/edit/:id",
    upload.array("images", 3),
    async (req, res) => {
        try {
            const productId = req.params.id;
            const { category, name, description, quantity, price } = req.body;
            const images = req.files;

            const product = await Product.findByIdAndUpdate(
                productId,
                {
                    category,
                    name,
                    images: images.map((image) => image.path),
                    description,
                    quantity,
                    price,
                },
                { new: true }
            );

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json({
                message: "Edit product successfully",
                product: product,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
);

router.delete("/products/delete/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.images && Array.isArray(product.images)) {
            product.images.forEach((image) => {
                if (fs.existsSync(image)) {
                    fs.unlinkSync(image);
                }
            });
        }

        await Product.findByIdAndDelete(productId);

        return res
            .status(200)
            .json({ message: "Delete product successfully", product: product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
