const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Gallery = require("../models/galleryModel");

const uploadSingleImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
        const { title, description } = req.body;
        const filePath = `uploads/gallery/${req.file.filename}`;
        if (mongoose.connection.readyState === 1) {
            const doc = await Gallery.create({ title, description, image: filePath });
            res.status(201).json({ success: true, data: doc });
        } else {
            res.status(201).json({ success: true, data: { title, description, image: filePath }, saved: false });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Images are required" });
        }
        const { title, description } = req.body;
        const docs = req.files.map(f => ({ title, description, image: `uploads/gallery/${f.filename}` }));
        if (mongoose.connection.readyState === 1) {
            const inserted = await Gallery.insertMany(docs);
            res.status(201).json({ success: true, count: inserted.length, data: inserted });
        } else {
            res.status(201).json({ success: true, count: docs.length, data: docs, saved: false });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllGalleries = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        if (mongoose.connection.readyState === 1) {
            const [items, total] = await Promise.all([
                Gallery.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                Gallery.countDocuments()
            ]);
            return res.status(200).json({
                success: true,
                total,
                page,
                totalPages: Math.ceil(total / limit),
                limit,
                data: items
            });
        }

        const dir = path.join(__dirname, "..", "uploads", "gallery");
        await fs.promises.mkdir(dir, { recursive: true });
        const files = await fs.promises.readdir(dir);
        const stats = await Promise.all(files.map(async (f) => {
            const s = await fs.promises.stat(path.join(dir, f));
            return { file: f, mtime: s.mtimeMs };
        }));
        stats.sort((a, b) => b.mtime - a.mtime);
        const total = stats.length;
        const slice = stats.slice(skip, skip + limit).map((x) => ({
            title: null,
            description: null,
            image: `uploads/gallery/${x.file}`,
            createdAt: new Date(x.mtime)
        }));
        return res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            data: slice,
            saved: false
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getGalleryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ success: false, message: "Database not connected", saved: false });
        }
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid gallery ID" });
        }
        const item = await Gallery.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Gallery not found" });
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteSingleImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ success: false, message: "Database not connected", saved: false });
        }
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid gallery ID" });
        }
        const doc = await Gallery.findById(id);
        if (!doc) return res.status(404).json({ success: false, message: "Gallery not found" });
        if (doc.image) {
            const abs = path.join(__dirname, "..", doc.image);
            try { await fs.promises.unlink(abs); } catch { }
        }
        await Gallery.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Gallery deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteMultipleImages = async (req, res) => {
    try {
        const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ success: false, message: "Database not connected", saved: false });
        }
        const validIds = ids.filter((id) => id && id.match(/^[0-9a-fA-F]{24}$/));
        if (validIds.length === 0) {
            return res.status(400).json({ success: false, message: "No valid IDs provided" });
        }
        const docs = await Gallery.find({ _id: { $in: validIds } });
        await Promise.allSettled(docs.map(async (doc) => {
            if (doc.image) {
                const abs = path.join(__dirname, "..", doc.image);
                try { await fs.promises.unlink(abs); } catch { }
            }
        }));
        const result = await Gallery.deleteMany({ _id: { $in: validIds } });
        return res.status(200).json({ success: true, deleted: result.deletedCount || 0 });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { uploadSingleImage, uploadMultipleImages, getAllGalleries, getGalleryById, deleteSingleImage, deleteMultipleImages };
