const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Fetch all feedback
// GET /api/feedback
router.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedback entries
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reply to feedback
router.put("/reply/:id", async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { reply },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Reply sent successfully", feedback });
  } catch (error) {
    console.error("Error replying to feedback:", error);
    res.status(500).json({ message: "Failed to send reply" });
  }
});
// POST /api/feedback
router.post("/feedback", async (req, res) => {
  const { patientName, doctorEmail, message } = req.body;

  // Validate the input
  if (!patientName || !doctorEmail || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const feedback = new Feedback({ patientName, doctorEmail, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});



module.exports = router;
