const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const eventController = require("../controllers/eventController");

const uploadDir = path.join(__dirname, "..", "uploads", "event");
fs.promises.mkdir(uploadDir, { recursive: true }).catch(() => { });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname || "");
        const name = Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8) + ext;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
    else cb(null, false);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
    }
});

// ---------------------------------------------
// Public Routes
// ---------------------------------------------

// Get all events (with pagination & filters)
router.get("/", eventController.getEvents);

// Get single event by ID
router.get("/:id", eventController.getEventById);

// ---------------------------------------------
// Admin / Private Routes (Require Authentication)
// ---------------------------------------------

// Upload event gallery images
router.post("/upload-gallery", upload.array("images", 10), eventController.uploadEventGallery);

// Create new event
router.post("/", eventController.createEvent);

// Update event by ID
router.put("/:id", eventController.updateEvent);

// Delete event by ID
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
