const express = require("express");
const router = express.Router();
const {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    deleteVolunteer
} = require("../controllers/volunteerController");

router.post("/", createVolunteer);
router.get("/", getAllVolunteers);
router.get("/:id", getVolunteerById);
router.delete("/:id", deleteVolunteer);

module.exports = router;
