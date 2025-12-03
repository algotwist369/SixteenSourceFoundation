const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadSingleImage, uploadMultipleImages, getAllGalleries, getGalleryById, deleteSingleImage, deleteMultipleImages } = require("../controllers/galleryController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "gallery");
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

router.post("/upload", upload.single("image"), uploadSingleImage);
router.post("/uploads", upload.array("images", 20), uploadMultipleImages);
router.get("/", getAllGalleries);
router.get("/:id", getGalleryById);
router.delete("/:id", deleteSingleImage);
router.delete("/", deleteMultipleImages);

module.exports = router;
