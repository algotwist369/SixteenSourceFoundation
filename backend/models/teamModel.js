const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    photo: String,
    name: String,
    role: String,
    email: String,
    number: String,
    position: {
        type: Number,
        default: 999
    },
    details: [
        {
            label: String,
            value: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
})

module.exports = mongoose.model("Team", teamSchema);
