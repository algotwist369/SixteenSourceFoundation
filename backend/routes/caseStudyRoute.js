const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getAllCaseStudies, createCaseStudy, getCaseStudyById, updateCaseStudy, deleteCaseStudy, uploadCaseStudyImage } = require("../controllers/caseStudyController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "caseStudies");
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

router.post("/", createCaseStudy);
router.post("/upload", upload.single("image"), uploadCaseStudyImage);
router.get("/", getAllCaseStudies);
router.get("/:id", getCaseStudyById);
router.put("/:id", updateCaseStudy);
router.delete("/:id", deleteCaseStudy);

module.exports = router;
