const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
    const uri = process.env.MONGO_URI;
    if (!uri || typeof uri !== "string" || uri.trim() === "") {
        console.log("Database connection skipped: MONGO_URI not set");
        return;
    }
    mongoose
        .connect(uri)
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log("Database connection error", error);
        });
}

module.exports = dbConnection;
