require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require("helmet");

// import modules
const database = require("./config/database");
const corsOptions = require("./config/cors");
require("./utilities/googleAuth");

// import routers
const AccountRouter = require("./routes/Account");
const TaskRouter = require("./routes/Task");
const UserRouter = require("./routes/User");
const ProductRouter = require("./routes/Product");
const GoogleAuth = require("./routes/GoogleAuth");

const app = express();
database.connection();

// session configure for passport.js
app.use(
    session({
        secret: "itsasecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

// middlewares
app.use(cors(corsOptions)); // enable CORS for specific origin
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

// register the end-points
app.use("/account", AccountRouter);
app.use("/social", GoogleAuth);
app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

// middleware to handle global error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong.." });
});

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
