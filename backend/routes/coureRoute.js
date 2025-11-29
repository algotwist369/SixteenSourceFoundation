const express = require("express");
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

// Create course
router.post("/", createCourse);

// Get all courses (with pagination)
router.get("/", getAllCourses);

// Get a single course by ID
router.get("/:id", getCourseById);

// Update a course by ID
router.put("/:id", updateCourse);

// Delete a course by ID
router.delete("/:id", deleteCourse);

module.exports = router;
