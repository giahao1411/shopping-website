const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

router.get("/users", async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const users = await User.find().skip(skip).limit(parseInt(limit));
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json({ users, totalPages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/users/:id", async (req, res) => {
    const userID = req.params.id;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User found", user: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.patch("/users/status/:id", async (req, res) => {
    const userID = req.params.id;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = user.status === "active" ? "banned" : "active";
        await user.save();

        return res
            .status(200)
            .json({ message: `User status updated to ${user.status}` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
