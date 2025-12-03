const Gallery = require("../models/galleryModel");
const fs = require("fs");
const path = require("path");

// Helper to delete file from filesystem
const deleteFile = (filePath) => {
    const fullPath = path.join(__dirname, "..", "uploads", "gallery", path.basename(filePath));
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

const uploadSingleImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const imageUrl = `/uploads/gallery/${req.file.filename}`;
        const newImage = await Gallery.create({ imageUrl });

        return res.status(201).json({ success: true, message: "Image uploaded successfully", data: newImage });
    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        const images = req.files.map(file => ({
            imageUrl: `/uploads/gallery/${file.filename}`
        }));

        const createdImages = await Gallery.insertMany(images);

        return res.status(201).json({ success: true, message: "Images uploaded successfully", data: createdImages });
    } catch (error) {
        console.error("Error uploading images:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const getAllGalleries = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: images });
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const getGalleryById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Gallery.findById(id);
        if (!image) return res.status(404).json({ success: false, message: "Image not found" });
        return res.status(200).json({ success: true, data: image });
    } catch (error) {
        console.error("Error fetching image:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const deleteSingleImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Gallery.findById(id);
        if (!image) return res.status(404).json({ success: false, message: "Image not found" });

        // Delete from filesystem
        deleteFile(image.imageUrl);

        // Delete from DB
        await Gallery.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const deleteMultipleImages = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting array of IDs
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: "No IDs provided" });
        }

        const images = await Gallery.find({ _id: { $in: ids } });

        // Delete files
        images.forEach(img => deleteFile(img.imageUrl));

        // Delete from DB
        await Gallery.deleteMany({ _id: { $in: ids } });

        return res.status(200).json({ success: true, message: "Images deleted successfully" });
    } catch (error) {
        console.error("Error deleting images:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    uploadSingleImage,
    uploadMultipleImages,
    getAllGalleries,
    getGalleryById,
    deleteSingleImage,
    deleteMultipleImages
};
