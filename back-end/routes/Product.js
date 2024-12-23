const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");

const upload = require("../middlewares/multer");

// get all products
router.get("/products", async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(parseInt(limit));

        const productsWithFullImages = products.map((product) => ({
            ...product.toObject(),
            images: product.images.map(
                (image) => `${process.env.HOST}/${image}`
            ),
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

// get product by id
router.get("/products/:id", async (req, res) => {
    const productID = req.params.id;

    try {
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productWithFullImages = {
            ...product.toObject(),
            images: product.images.map(
                (image) => `${process.env.HOST}/${image}`
            ),
        };

        return res
            .status(200)
            .json({ message: "Product found", product: productWithFullImages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route to handle adding a new product
router.post("/products", upload, async (req, res) => {
    const { category, name, description, quantity, price } = req.body;
    const images = req.files;

    try {
        // Kiểm tra các trường bắt buộc
        if (!category || !name || !quantity || !price) {
            return res.status(400).json({ message: "Fill all the required fields!" });
        }

        // Kiểm tra giá trị âm cho quantity và price
        if (quantity < 0) {
            return res.status(400).json({ message: "Quantity cannot be negative." });
        }
        if (price < 0) {
            return res.status(400).json({ message: "Price cannot be negative." });
        }

        // Kiểm tra số lượng ảnh
        if (!images || images.length === 0) {
            return res.status(400).json({ message: "You must upload at least one image." });
        }

        if (images.length > 5) {
            // Xóa các tệp ảnh đã tải lên nếu vượt quá giới hạn
            images.forEach((file) => fs.unlinkSync(file.path));
            return res.status(400).json({
                message: `You can upload a maximum of 5 images. You attempted to upload ${images.length} image(s).`,
            });
        }

        // Tiến hành lưu sản phẩm mới
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

        // Cập nhật thông tin danh mục
        const updateCategory = await Category.findOneAndUpdate(
            { type: category },
            { $inc: { amount: 1 } },
            { new: true }
        );
        if (!updateCategory) {
            return res.status(400).json({ message: "Category not found!" });
        }

        return res.status(200).json({
            message: "Product added successfully",
            product: newProduct,
            category: updateCategory,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Edit product with image validation
router.patch("/products/edit/:id", upload, async (req, res) => {
    const productId = req.params.id;
    const { category, name, description, quantity, price } = req.body;
    const images = req.files;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Kiểm tra giá trị âm cho quantity và price
        if (quantity < 0) {
            return res.status(400).json({ message: "Quantity cannot be negative." });
        }
        if (price < 0) {
            return res.status(400).json({ message: "Price cannot be negative." });
        }

        // Kết hợp ảnh cũ và ảnh mới
        const existingImages = product.images || [];
        const newImages = images ? images.map((image) => image.path) : [];

        // Kiểm tra tổng số ảnh: nếu số ảnh cũ + mới vượt quá 5, trả về lỗi
        if (existingImages.length + newImages.length > 5) {
            // Xóa các ảnh mới nếu không được lưu
            if (newImages.length > 0) {
                newImages.forEach((image) => fs.unlinkSync(image));
            }
            return res.status(400).json({
                message: `Cannot upload more than 5 images. Current: ${existingImages.length}, Adding: ${newImages.length}`,
            });
        }

        // Cập nhật sản phẩm
        product.category = category || product.category;
        product.name = name || product.name;
        product.description = description || product.description;
        product.quantity = quantity || product.quantity;
        product.price = price || product.price;
        product.images = [...existingImages, ...newImages];  // Kết hợp ảnh cũ và mới

        await product.save();

        return res.status(200).json({
            message: "Product edited successfully",
            product: product,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete product by id
router.delete("/products/delete/:id", async (req, res) => {
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

        const updateCategory = await Category.findOneAndUpdate(
            { type: product.category },
            { $inc: { amount: -1 } },
            { new: true }
        );
        if (!updateCategory) {
            return res.status(400).json({ message: "Category not found!" });
        }

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            message: "Delete product successfully",
            product: product,
            category: updateCategory,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete image by filename
router.delete("/products/delete/images/:id/:filename", async (req, res) => {
    const { id, filename } = req.params;
    const dbImg = path.join("uploads", filename);

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const filePath = path.join(__dirname, "..", "uploads", filename);

        // delete on backend uploads
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        product.images = product.images.filter((img) => img !== dbImg);
        await product.save();

        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
