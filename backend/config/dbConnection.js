const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection error", error)
    }
}

module.exports = dbConnection;
