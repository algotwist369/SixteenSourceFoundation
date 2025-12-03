const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    }
}, { timestamps: true });

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
