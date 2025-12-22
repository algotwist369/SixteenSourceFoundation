const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: String,
    answer: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
})

module.exports = mongoose.model("FAQ", faqSchema);
