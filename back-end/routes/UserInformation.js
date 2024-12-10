const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

router.get("/information/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId, "username addresses phones");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Get addresses and phones success",
            username: user.username,
            addresses: user.addresses,
            phones: user.phones,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
