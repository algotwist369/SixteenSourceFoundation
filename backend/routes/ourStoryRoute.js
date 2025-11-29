const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadVideo, getAllOurStories, createOurStory, getOurStoryById, updateOurStory, deleteOurStory } = require("../controllers/ourStoryController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "video");
fs.mkdirSync(uploadDir, { recursive: true });

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
    if (file.mimetype && file.mimetype.startsWith("video/")) cb(null, true);
    else cb(null, false);
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("video"), uploadVideo);
router.post("/", createOurStory);
router.get("/", getAllOurStories);
router.get("/:id", getOurStoryById);
router.put("/:id", updateOurStory);
router.delete("/:id", deleteOurStory);

module.exports = router;
