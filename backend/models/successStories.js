const mongoose = require("mongoose");

const successStoriesSchema = new mongoose.Schema({
    name: String,
    role: String,
    description: String,
    video: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("SuccessStories", successStoriesSchema);