const Team = require("../models/teamModel");

const uploadTeamPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Photo file is required" });
        }
        const filePath = `uploads/profile/${req.file.filename}`;
        return res.status(201).json({ success: true, photo: filePath });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllTeams = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const teams = await Team.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Team.countDocuments();

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            data: teams
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const createTeam = async (req, res) => {
    try {
        const { photo, name, role, email, number } = req.body;

        if (!name || !role) {
            return res.status(400).json({ success: false, message: "Name and role are required" });
        }

        const newTeam = await Team.create({ photo, name, role, email, number });

        res.status(201).json({ success: true, message: "Team member created successfully", data: newTeam });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid team ID" });
        }
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ success: false, message: "Team member not found" });
        }
        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid team ID" });
        }

        if (req.body.name !== undefined && req.body.name.trim() === "") {
            return res.status(400).json({ success: false, message: "Name cannot be empty" });
        }

        const updated = await Team.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Team member not found" });
        }
        res.status(200).json({ success: true, message: "Team member updated successfully", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid team ID" });
        }
        const deleted = await Team.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Team member not found" });
        }
        res.status(200).json({ success: true, message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getAllTeams, createTeam, getTeamById, updateTeam, deleteTeam, uploadTeamPhoto };
