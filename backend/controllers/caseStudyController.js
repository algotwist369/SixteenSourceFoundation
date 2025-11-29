const CaseStudy = require("../models/caseStudy");

const getAllCaseStudies = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await CaseStudy.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await CaseStudy.countDocuments();

        return res.status(200).json({ success: true, total, page, totalPages: Math.ceil(total / limit), limit, data: items });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const createCaseStudy = async (req, res) => {
    try {
        const { title, content, image, number } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required" });
        }
        const created = await CaseStudy.create({ title, content, image, number });
        return res.status(201).json({ success: true, message: "Case study created", data: created });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const getCaseStudyById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid case study ID" });
        }
        const item = await CaseStudy.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Case study not found" });
        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const updateCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid case study ID" });
        }
        const updated = await CaseStudy.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: "Case study not found" });
        return res.status(200).json({ success: true, message: "Case study updated", data: updated });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

const deleteCaseStudy = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid case study ID" });
        }
        const deleted = await CaseStudy.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Case study not found" });
        return res.status(200).json({ success: true, message: "Case study deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getAllCaseStudies, createCaseStudy, getCaseStudyById, updateCaseStudy, deleteCaseStudy };
