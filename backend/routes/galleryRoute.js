const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadSingleImage, uploadMultipleImages, getAllGalleries, getGalleryById, deleteSingleImage, deleteMultipleImages, deleteAllImages } = require("../controllers/galleryController");

const router = express.Router();
// ... (omitting middleware lines if they don't change, but I need to be careful with replace_file_content)


const uploadDir = path.join(__dirname, "..", "uploads", "gallery");
// Create directory asynchronously
fs.promises.mkdir(uploadDir, { recursive: true }).catch(err => {
    if (err.code !== "EEXIST") console.error("Could not create upload directory", err);
});

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

router.post("/upload", upload.single("image"), uploadSingleImage);
router.post("/uploads", upload.array("images", 500), uploadMultipleImages);
router.get("/", getAllGalleries);
router.get("/:id", getGalleryById);
router.delete("/all", deleteAllImages);
router.delete("/:id", deleteSingleImage);
router.delete("/", deleteMultipleImages);

module.exports = router;
