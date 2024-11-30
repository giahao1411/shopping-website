require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import modules
const database = require("./config/database");
const corsOptions = require("./config/cors");

// import routers
const AccountRouter = require("./routes/Account");
const TaskRouter = require("./routes/Task");
const UserRouter = require("./routes/User");
const ProductRouter = require("./routes/Product");
const GoogleAuth = require("./routes/GoogleAuth");

const app = express();
database.connection();

// middlewares
app.use(cors(corsOptions)); // enable CORS for specific origin
app.use(bodyParser.json());

// register the end-points
app.use("/account", AccountRouter);
app.use("/social", GoogleAuth);
app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
