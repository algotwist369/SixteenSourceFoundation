const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        img_gallery: {
            type: [String],
            default: undefined,
        },

        organizer: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        points: {
            type: [String],
            default: undefined,
        },

        audience: {
            type: [String],
            default: undefined,
        },

        date: {
            type: Date,
            index: true,
        },

        location: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["upcoming", "completed"],
            default: "upcoming",
            index: true,
        },
    },
    {
        timestamps: true,
        minimize: true,
        versionKey: false, // ✅ only valid option
    }
);

eventSchema.index({ status: 1, date: 1 });

module.exports = mongoose.model("Event", eventSchema);
