const express = require("express");
const router = express.Router();
const createMeetLink = require("../controllers/createMeetLink");

// POST route for creating a video consultation link
router.post("/", createMeetLink);

module.exports = router;
