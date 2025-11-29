const express = require("express");
const { getAllFaqs, createFaq, getFaqById, updateFaq, deleteFaq } = require("../controllers/faqController");

const router = express.Router();

router.post("/", createFaq);
router.get("/", getAllFaqs);
router.get("/:id", getFaqById);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

module.exports = router;
