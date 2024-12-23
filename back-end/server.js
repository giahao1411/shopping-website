require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require("helmet");
const path = require("path");
const RedisStore = require("connect-redis").default;

// Import modules
const database = require("./config/database");
const corsOptions = require("./config/cors");
const { redisClient } = require("./config/redisClient");
require("./utilities/googleAuth");

// Import routers
const AccountRouter = require("./routes/Account");
const TaskRouter = require("./routes/Task");
const UserRouter = require("./routes/User");
const ProductRouter = require("./routes/Product");
const GoogleAuth = require("./routes/GoogleAuth");
const OrderRouter = require("./routes/Order");
const CategoryRouter = require("./routes/Category");
const CartRouter = require("./routes/Cart");
const CouponRouter = require("./routes/Coupon");
const UserInformationRouter = require("./routes/UserInformation");

const app = express();
database.connection();

// Serve static files from the "uploads" folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session configuration for passport.js
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: "itsasecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 1, // Cookie expiration time (1 hours)
        },
    })
);

// Apply middlewares
app.use(cors(corsOptions)); // Enable CORS with the configuration from "corsOptions"
app.use(bodyParser.json()); // Parse incoming request bodies as JSON
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Initialize passport session
app.use(helmet()); // Use Helmet for security headers

// Register API routes
app.use("/account", AccountRouter);
app.use("/social", GoogleAuth);
app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/order", OrderRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/cart", CartRouter);
app.use("/api/coupon", CouponRouter);
app.use("/api/user-information", UserInformationRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "MulterError") {
        return res.status(400).json({ message: err.message });
    }

    console.error(err.stack);
    return res.status(500).json({ message: "Something went wrong.." });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
