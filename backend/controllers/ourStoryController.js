const fs = require("fs");
const path = require("path");
const OurStory = require("../models/ourStoryModel");

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

const getAllOurStories = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await OurStory.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await OurStory.countDocuments();

        return res.status(200).json({ success: true, total, page, totalPages: Math.ceil(total / limit), limit, data: items });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const createOurStory = async (req, res) => {
    try {
        const { title, ourJourney, ourMission, ourStrategy, number, video } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }
        const created = await OurStory.create({ title, ourJourney, ourMission, ourStrategy: Array.isArray(ourStrategy) ? ourStrategy : [], number, video });
        return res.status(201).json({ success: true, message: "Our story created", data: created });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getOurStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid our story ID" });
        }
        const item = await OurStory.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Our story not found" });
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateOurStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid our story ID" });
        }
        const updated = await OurStory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: "Our story not found" });
        return res.status(200).json({ success: true, message: "Our story updated", data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteOurStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid our story ID" });
        }
        const doc = await OurStory.findById(id);
        if (!doc) return res.status(404).json({ success: false, message: "Our story not found" });
        if (doc.video && doc.video.startsWith("uploads/")) {
            const abs = path.join(__dirname, "..", doc.video);
            try { await fs.promises.unlink(abs); } catch { }
        }
        await OurStory.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Our story deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { uploadVideo, getAllOurStories, createOurStory, getOurStoryById, updateOurStory, deleteOurStory };
