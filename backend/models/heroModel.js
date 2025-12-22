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
}, {
    timestamps: true
});

heroSchema.index({ createdAt: -1 });

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
