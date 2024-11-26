const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

const validateEmail = require("../utilities/validateEmail");
const validatePassword = require("../utilities/validatePassword");

// login - authenticate account
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
        if (!isMatch || user.status === "banned") {
            return res
                .status(404)
                .json({ message: "Invalid password or You're banned" });
        }

        return res
            .status(200)
            .json({ message: "Login successfully", role: user.role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// register - create account
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

        if (!validateEmail(email)) {
            return res.status(406).json({
                message: "Invalid email format",
            });
        }

        if (!validatePassword(password)) {
            return res.status(406).json({
                message:
                    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number",
            });
        }

        const role = email === "admin@gmail.com" ? "admin" : "user";

        // create new user
        const newUser = new User({
            username,
            email,
            password,
            role,
            status: "active",
        });
        await newUser.save();

        return res.status(200).json({ message: "Register successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// check email
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

// update password
router.patch("/update-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!validatePassword(newPassword)) {
            return res.status(406).json({
                message:
                    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number",
            });
        } else {
            user.password = newPassword;
            await user.save();
        }

        return res
            .status(200)
            .json({ message: "Password update successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
