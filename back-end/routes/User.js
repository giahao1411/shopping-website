const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");
const Coupon = require("../models/CouponModel");

const validatePhone = require("../utilities/validatePhone");

// get user list by limit
router.get("/users", async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
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

// get user's information
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

router.patch("/users/update/:id", async (req, res) => {
    const userID = req.params.id;
    const { username } = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(userID, {
            username,
        });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// update user status
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

// add address
router.post("/users/:id/add-address", async (req, res) => {
    const { id } = req.params;
    let { address } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if existed address
        if (user.addresses.includes(address)) {
            return res.status(400).json({ message: "Address already exists." });
        }

        user.addresses.push(address);
        await user.save();

        return res.status(200).json({ message: "Address added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// update address
router.patch("/users/:id/update-address", async (req, res) => {
    const { id } = req.params;
    const { oldAddress, newAddress } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id, addresses: oldAddress },
            { $set: { "addresses.$": newAddress } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Update addresses successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// update addresses
router.patch("/users/:id/update-addresses", async (req, res) => {
    const { id } = req.params;
    const { addresses } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { addresses },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Update addresses successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// delete specific address
router.delete("/users/:id/delete-address/:address", async (req, res) => {
    const { id, address } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if address existed in array
        const addressIndex = user.addresses.findIndex((a) => a === address);
        if (addressIndex === -1) {
            return res.status(404).json({ message: "Address not found" });
        }

        user.addresses.splice(addressIndex, 1);
        await user.save();

        return res
            .status(200)
            .json({ message: "Address deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// add phone
router.post("/users/:id/add-phone", async (req, res) => {
    const { id } = req.params;
    let { phone } = req.body;

    // validate phone number
    if (!validatePhone(phone)) {
        return res.status(400).json({
            message:
                "Phone number format must starts 0 and 9 numbers comes after",
        });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if phone number already exists
        if (user.phones.includes(phone)) {
            return res
                .status(400)
                .json({ message: "Phone number already exists." });
        }

        user.phones.push(phone);
        await user.save();

        return res
            .status(200)
            .json({ message: "Phone number added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// update phone
router.patch("/users/:id/update-phone", async (req, res) => {
    const { id } = req.params;
    const { oldPhone, newPhone } = req.body;

    // validate phone number
    if (!validatePhone(newPhone)) {
        return res.status(400).json({
            message:
                "Phone number format must starts 0 and 9 numbers comes after",
        });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id, phones: oldPhone },
            { $set: { "phones.$": newPhone } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Phone number updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// update phones
router.patch("/users/:id/update-phones", async (req, res) => {
    const { id } = req.params;
    const { phones } = req.body;

    // Validate all phone numbers
    for (let phone of phones) {
        if (!validatePhone(phone)) {
            return res
                .status(400)
                .json({ message: `Invalid phone number format: ${phone}` });
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { phones },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Phones updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// delete specific phone
router.delete("/users/:id/delete-phone/:phone", async (req, res) => {
    const { id, phone } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if phone exists in the array
        const phoneIndex = user.phones.findIndex((p) => p === phone);
        if (phoneIndex === -1) {
            return res.status(404).json({ message: "Phone number not found" });
        }

        user.phones.splice(phoneIndex, 1);
        await user.save();

        return res
            .status(200)
            .json({ message: "Phone number deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/users/:id/add-coupon", async (req, res) => {
    const { id } = req.params;
    const { CouponCode } = req.body;

    try {
        const coupon = await Coupon.findOne({ code: CouponCode, status: "enabled" });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found or disabled" });
        }

        if (coupon.usesCount >= coupon.maxUses) {
            return res.status(400).json({ message: "Coupon has reached its usage limit" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.useCoupon(CouponCode);

        coupon.usesCount += 1;
        await coupon.save();

        return res.status(200).json({ message: "Coupon added successfully", coupons: user.coupons });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
