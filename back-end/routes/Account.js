const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Login successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Register route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // check if empty
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // check if email existed
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already existed" });
        }

        // create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(200).json({ message: "Register successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Checking email route
router.post("/check-email", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ existed: true });
        } else {
            return res
                .status(404)
                .json({ existed: false, message: "Email not found." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Update password route
router.patch("/update-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword;
        await user.save();

        return res
            .status(200)
            .json({ message: "Password update successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
