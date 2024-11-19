require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import modules
const database = require("./config/database");

// import routers
const AccountRouter = require("./routes/Account");

const app = express();
database.connection();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

// middlewares
app.use(cors(corsOptions)); // enable CORS for specific origin
app.use(bodyParser.json());

// register the end-points
app.use("/account", AccountRouter);

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT);
