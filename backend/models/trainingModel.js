const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    image: String,
    duration: String,
    topics: [String],
    benefits: [String],
    isNew: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Training", trainingSchema);