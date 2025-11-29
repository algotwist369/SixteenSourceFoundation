const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadQrCode, getAllBankTransfers, createBankTransfer, getBankTransferById, updateBankTransfer, deleteBankTransfer } = require("../controllers/bankTransferController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads", "banckQR");
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
    if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
    else cb(null, false);
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("qrCodeImage"), uploadQrCode);
router.post("/", createBankTransfer);
router.get("/", getAllBankTransfers);
router.get("/:id", getBankTransferById);
router.put("/:id", updateBankTransfer);
router.delete("/:id", deleteBankTransfer);

module.exports = router;
