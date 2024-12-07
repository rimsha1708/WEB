const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat"); // Ensure this matches your schema

// Save chat message
router.post("/", async (req, res) => {
  const { doctorId, patientId, sender, message } = req.body;

  // Validate the request body
  if (!doctorId || !patientId || !sender || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Save the message to the database
    const newMessage = new Chat({ doctorId, patientId, sender, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Failed to save message" });
  }
});

module.exports = router;
