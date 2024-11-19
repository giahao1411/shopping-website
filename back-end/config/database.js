const mongoose = require("mongoose");

const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database successfully!");
    } catch (error) {
        console.error("Database connect failed:", error);
    }
};

module.exports = { connection };
