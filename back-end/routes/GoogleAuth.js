const passport = require("passport");
const express = require("express");
const router = express.Router();

// google auth utility
require("../utilities/googleAuth");

router.get(
    "/google/auth",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const user = req.user;
        const queryParams = new URLSearchParams({
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });

        if (user.status === "banned") {
            return res.redirect(
                "http://localhost:5173/account/oauth/callback?error=Your+account+is+banned"
            );
        }

        return res.redirect(
            `http://localhost:5173/account/oauth/callback?${queryParams}`
        );
    }
);

router.get("/google/auth/failure", (req, res) => {
    return res.redirect(
        "http://localhost:5173/account/oauth/callback?error=Authentication+failed"
    );
});

module.exports = router;
