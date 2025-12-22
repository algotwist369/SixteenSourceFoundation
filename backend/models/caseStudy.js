const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    number: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
})

module.exports = mongoose.model("CaseStudy", caseStudySchema);