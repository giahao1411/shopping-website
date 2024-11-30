const passport = require("passport");
const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

// google auth utility
require("../utilities/googleAuth");

router.get(
    "/google/auth",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/google/auth/failure",
    })
);

router.get("/google/auth/failure", (req, res) => {
    return res.status(400).json({ message: "Something went wrong..." });
});

module.exports = router;
