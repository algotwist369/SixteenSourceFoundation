const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    education: {
        type: String,
        required: true,
        enum: ["Primary", "Secondary", "Higher Secondary", "Graduation", "Post Graduation", "Other"]
    },
    message: {
        type: String,
        required: true  
    }
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;