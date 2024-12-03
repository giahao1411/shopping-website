const express = require("express");
const router = express.Router();
const fs = require("fs");

const Product = require("../models/ProductModel");

const upload = require("../middlewares/multer");

router.get("/products", async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(parseInt(limit));

        // Thêm URL đầy đủ vào hình ảnh
        const productsWithFullImages = products.map((product) => ({
            ...product.toObject(),
            images: product.images.map(
                (image) => `http://localhost:8080/${image}`
            ), // Đảm bảo trả về URL đầy đủ cho ảnh
        }));

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        return res
            .status(200)
            .json({ products: productsWithFullImages, totalPages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/products/:id", async (req, res) => {
    const productID = req.params.id;

    try {
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Thêm URL đầy đủ vào hình ảnh
        const productWithFullImages = {
            ...product.toObject(),
            images: product.images.map(
                (image) => `http://localhost:8080/${image}`
            ),
        };

        return res
            .status(200)
            .json({ message: "Product found", product: productWithFullImages });
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
    "products/edit/:id",
    upload.array("images", 3),
    async (req, res) => {
        const productId = req.params.id;
        const { category, name, description, quantity, price } = req.body;

        try {
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

router.delete("products/delete/:id", async (req, res) => {
    const productId = req.params.id;

    try {
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
