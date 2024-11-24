const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
