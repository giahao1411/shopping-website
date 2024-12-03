// config/cors.js
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173",  // Frontend URL
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

module.exports = corsOptions;
