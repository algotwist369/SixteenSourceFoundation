const Course = require("../models/courseModel");

// get all courses
const getAllCourses = async (req, res) => {
    try {
        // Get page & limit from query (default: page=1, limit=10)
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        // Calculate skip
        let skip = (page - 1) * limit;

        // Fetch courses with pagination
        const courses = await Course.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // optional: latest first

        // Get total number of documents
        const total = await Course.countDocuments();

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            data: courses
        });

    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            image,
            duration,
            topics,
            benefits,
            isNewCourse,
            number
        } = req.body;

        // Basic validation
        if (!title || !description || !number || !image) {
            return res.status(400).json({
                success: false,
                message: "Title, description, number and image are required"
            });
        }

        // Create new course
        const newCourse = await Course.create({
            title,
            description,
            image,
            duration,
            topics: Array.isArray(topics) ? topics : [],
            benefits: Array.isArray(benefits) ? benefits : [],
            isNewCourse: isNewCourse || false,
            number: number || 0
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        });

    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get course by ID
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });

    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// UPDATE COURSE BY ID
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        // Optional: validate required updates  
        if (req.body.title !== undefined && req.body.title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title cannot be empty"
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        });

    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE COURSE BY ID
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }

        const deleted = await Course.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Upload Course Image
const uploadCourseImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        const imagePath = `uploads/courses/${req.file.filename}`;

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
    getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    getCourseById,
    uploadCourseImage
};