const mongoose = require("mongoose");

const ourStorySchema = new mongoose.Schema({
    title: String,
    ourJourney: String,
    ourMission: String,
    ourStrategy: [String],
    number: Number,
    video: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
})

module.exports = mongoose.model("OurStory", ourStorySchema);