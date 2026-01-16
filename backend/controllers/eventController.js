const Event = require("../models/event_model");

exports.uploadEventGallery = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        const imgPaths = req.files.map(file => `uploads/event/${file.filename}`);

        return res.status(201).json({
            success: true,
            data: imgPaths,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);

        await event.save();

        return res.status(201).json({
            success: true,
            data: event,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const { status, page = 1, limit = 10, sortBy = "date", order = "asc" } = req.query;

        const filter = {};
        if (status === "upcoming") {
            // For "upcoming", filter by status AND future dates
            filter.status = "upcoming";
            filter.date = { $gte: new Date() }; // Only events from today onwards
        } else if (status === "completed") {
            filter.status = "completed";
        } else if (status) {
            filter.status = status;
        }

        const sortOrder = order === "asc" ? 1 : -1;

        const events = await Event.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean() // Lean queries = JS objects (less CPU & memory)
            .select("title date location status img_gallery organizer description"); // fetch only necessary fields

        const total = await Event.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: events,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).lean();

        if (!event)
            return res.status(404).json({ success: false, error: "Event not found" });

        return res.status(200).json({ success: true, data: event });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return updated document
            runValidators: true, // ensures updated data is valid
            lean: true, // returns plain JS object
        });

        if (!event)
            return res.status(404).json({ success: false, error: "Event not found" });

        return res.status(200).json({ success: true, data: event });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id).lean();

        if (!event)
            return res.status(404).json({ success: false, error: "Event not found" });

        return res.status(200).json({ success: true, message: "Event deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};
