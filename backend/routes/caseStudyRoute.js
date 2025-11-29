const express = require("express");
const { getAllCaseStudies, createCaseStudy, getCaseStudyById, updateCaseStudy, deleteCaseStudy } = require("../controllers/caseStudyController");

const router = express.Router();

router.post("/", createCaseStudy);
router.get("/", getAllCaseStudies);
router.get("/:id", getCaseStudyById);
router.put("/:id", updateCaseStudy);
router.delete("/:id", deleteCaseStudy);

module.exports = router;
