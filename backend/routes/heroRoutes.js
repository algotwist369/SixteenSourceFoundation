const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const {
    createHeroSlide,
    getAllHeroSlides,
    getHeroSlideById,
    updateHeroSlide,
    deleteHeroSlide,
    uploadHeroImage
} = require("../controllers/heroController");

const uploadDir = path.join(__dirname, "..", "uploads", "hero");
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

router.post("/", createHeroSlide);
router.post("/upload", upload.single("image"), uploadHeroImage);
router.get("/", getAllHeroSlides);
router.get("/:id", getHeroSlideById);
router.put("/:id", updateHeroSlide);
router.delete("/:id", deleteHeroSlide);

module.exports = router;
