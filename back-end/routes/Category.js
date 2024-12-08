const express = require("express");
const router = express.Router();

const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");

// get categories by pagination
router.get("/categories", async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const categories = await Category.find()
            .skip(skip)
            .limit(parseInt(limit));

        const totalCategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        return res.status(200).json({ categories: categories, totalPages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// get all categories
router.get("/categories/all", async (req, res) => {
    try {
        const categories = await Category.find();

        return res
            .status(200)
            .json({ message: "Categories found", categories: categories });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/categories", async (req, res) => {
    const { type } = req.body;
    console.log(type);

    if (!type) {
        return res
            .status(400)
            .json({ message: "Fill all the required fields!" });
    }

    try {
        const category = await Category.findOne({ type });
        if (category) {
            return res.status(400).json({ message: "Category existed" });
        }

        const newCategory = new Category({ type });
        await newCategory.save();

        return res
            .status(200)
            .json({ message: "Category created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/categories/delete/:type", async (req, res) => {
    const { type } = req.params;

    try {
        const associatedProducts = await Product.find({ category: type });
        if (associatedProducts.length > 0) {
            return res.status(400).json({
                message: `Cannot delete category "${type}" because it is associated with ${associatedProducts.length} product(s)`,
            });
        }

        const category = await Category.findOneAndDelete({ type });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            message: "Category delete successfully",
            category: category,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
