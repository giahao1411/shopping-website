// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

module.exports = corsOptions;
