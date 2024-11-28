const express = require("express");
const router = express.Router();

const Product = require("../models/ProductModel");

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/products", async (req, res) => {
    try {
        const {
            category,
            name,
            images,
            description,
            quantity,
            price,
            most_sale,
        } = req.body;

        if (!category || !name || !quantity || !price) {
            return res
                .status(400)
                .json({ message: "Fill all the required fields!" });
        }

        // image and description are optional for a product
        const newProduct = new Product({
            category: category,
            name: name,
            images: images || [],
            description: description || "",
            quantity: quantity,
            price: price,
            most_sale: most_sale || 0,
        });

        await newProduct.save();
        return res
            .status(200)
            .json({ message: "Add product successfully", product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch("/products/edit/:id", async (req, res) => {});

router.patch("/products/delete/:id", async (req, res) => {});

module.exports = router;
