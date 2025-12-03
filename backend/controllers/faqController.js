const FAQ = require("../models/faq");

const getAllFaqs = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await FAQ.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await FAQ.countDocuments();

        return res.status(200).json({ success: true, total, page, totalPages: Math.ceil(total / limit), limit, data: items });
    } catch (error) {
        console.error("Error in getAllFaqs:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

const createFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ success: false, message: "Question and answer are required" });
        }
        const created = await FAQ.create({ question, answer });
        return res.status(201).json({ success: true, message: "FAQ created", data: created });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
        }
        const item = await FAQ.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "FAQ not found" });
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
        }
        const updated = await FAQ.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: "FAQ not found" });
        return res.status(200).json({ success: true, message: "FAQ updated", data: updated });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
        }
        const deleted = await FAQ.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "FAQ not found" });
        return res.status(200).json({ success: true, message: "FAQ deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getAllFaqs, createFaq, getFaqById, updateFaq, deleteFaq };
