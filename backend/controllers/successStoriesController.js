const fs = require("fs");
const path = require("path");
const SuccessStories = require("../models/successStories");

const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Video file is required" });
        }
        const filePath = `uploads/video/${req.file.filename}`;
        return res.status(201).json({ success: true, video: filePath });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllSuccessStories = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await SuccessStories.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await SuccessStories.countDocuments();

        return res.status(200).json({ success: true, total, page, totalPages: Math.ceil(total / limit), limit, data: items });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const createSuccessStory = async (req, res) => {
    try {
        const { name, role, description, video } = req.body;
        if (!name || !role) {
            return res.status(400).json({ success: false, message: "Name and role are required" });
        }
        const created = await SuccessStories.create({ name, role, description, video });
        return res.status(201).json({ success: true, message: "Success story created", data: created });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getSuccessStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid success story ID" });
        }
        const item = await SuccessStories.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Success story not found" });
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateSuccessStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid success story ID" });
        }
        const updated = await SuccessStories.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: "Success story not found" });
        return res.status(200).json({ success: true, message: "Success story updated", data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteSuccessStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid success story ID" });
        }
        const doc = await SuccessStories.findById(id);
        if (!doc) return res.status(404).json({ success: false, message: "Success story not found" });
        if (doc.video && doc.video.startsWith("uploads/")) {
            const abs = path.join(__dirname, "..", doc.video);
            try { await fs.promises.unlink(abs); } catch {}
        }
        await SuccessStories.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Success story deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { uploadVideo, getAllSuccessStories, createSuccessStory, getSuccessStoryById, updateSuccessStory, deleteSuccessStory };
