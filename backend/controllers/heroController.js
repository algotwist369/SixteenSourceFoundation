const Hero = require("../models/heroModel");

const createHeroSlide = async (req, res) => {
    try {
        const { image, title, subtitle } = req.body;

        if (!image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const newSlide = await Hero.create({ image, title, subtitle });

        res.status(201).json({ success: true, message: "Hero slide created successfully", data: newSlide });
    } catch (error) {
        console.error("Error creating hero slide:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllHeroSlides = async (req, res) => {
    try {
        const slides = await Hero.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: slides });
    } catch (error) {
        console.error("Error fetching hero slides:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getHeroSlideById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid slide ID" });
        }

        const slide = await Hero.findById(id);
        if (!slide) {
            return res.status(404).json({ success: false, message: "Hero slide not found" });
        }

        res.status(200).json({ success: true, data: slide });
    } catch (error) {
        console.error("Error fetching hero slide:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateHeroSlide = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid slide ID" });
        }

        const updatedSlide = await Hero.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedSlide) {
            return res.status(404).json({ success: false, message: "Hero slide not found" });
        }

        res.status(200).json({ success: true, message: "Hero slide updated successfully", data: updatedSlide });
    } catch (error) {
        console.error("Error updating hero slide:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteHeroSlide = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid slide ID" });
        }

        const deleted = await Hero.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Hero slide not found" });
        }

        res.status(200).json({ success: true, message: "Hero slide deleted successfully" });
    } catch (error) {
        console.error("Error deleting hero slide:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const uploadHeroImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        const imagePath = `uploads/hero/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image: imagePath
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createHeroSlide,
    getAllHeroSlides,
    getHeroSlideById,
    updateHeroSlide,
    deleteHeroSlide,
    uploadHeroImage
};
