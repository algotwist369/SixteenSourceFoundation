const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    duration: String,
    topics: [String],
    benefits: [String],
    isNew: Boolean,
    number: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Course", courseSchema);