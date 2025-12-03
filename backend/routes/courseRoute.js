const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, uploadCourseImage } = require("../controllers/courseController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "courses");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

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

const upload = multer({ storage, fileFilter });

router.post("/", createCourse);
router.post("/upload", upload.single("image"), uploadCourseImage);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
