const express = require("express");
const router = express.Router();
const EducationalContent = require("../models/EducationalContent");

// Add educational content (Admin)
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const content = new EducationalContent({ title, description });
    await content.save();
    res.status(201).json({ message: "Educational content added successfully", content });
  } catch (error) {
    res.status(500).json({ message: "Error adding educational content", error });
  }
});

// Get all educational content (Doctors/Patients)
router.get("/", async (req, res) => {
  try {
    const contents = await EducationalContent.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching educational content", error });
  }
});

module.exports = router;
