require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import modules
const database = require("./config/database");
const corsOptions = require("./config/cors");

// import routers
const AccountRouter = require("./routes/Account");
const UserRouter = require("./routes/User");

const app = express();
database.connection();

// middlewares
app.use(cors(corsOptions)); // enable CORS for specific origin
app.use(bodyParser.json());

// register the end-points
app.use("/account", AccountRouter);
app.use("/api", UserRouter);

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
