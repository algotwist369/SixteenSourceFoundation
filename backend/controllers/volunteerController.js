const Volunteer = require("../models/volunteerModel");

const createVolunteer = async (req, res) => {
    try {
        const { name, email, phone, address, gender, education, message } = req.body;

        if (!name || !email || !phone || !address || !gender || !education || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newVolunteer = await Volunteer.create({
            name,
            email,
            phone,
            address,
            gender,
            education,
            message
        });

        res.status(201).json({ success: true, message: "Volunteer application submitted successfully", data: newVolunteer });
    } catch (error) {
        console.error("Error creating volunteer:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllVolunteers = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const volunteers = await Volunteer.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Volunteer.countDocuments();

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            data: volunteers
        });
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getVolunteerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid volunteer ID" });
        }

        const volunteer = await Volunteer.findById(id);
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        res.status(200).json({ success: true, data: volunteer });
    } catch (error) {
        console.error("Error fetching volunteer:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid volunteer ID" });
        }

        const deleted = await Volunteer.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        res.status(200).json({ success: true, message: "Volunteer deleted successfully" });
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    deleteVolunteer
};
