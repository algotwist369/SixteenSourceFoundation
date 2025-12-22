const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    photo: String,
    name: String,
    role: String,
    email: String,
    number: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
})

module.exports = mongoose.model("Team", teamSchema);
