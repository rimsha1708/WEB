const express = require("express");
const router = express.Router();
const MedicalGuideline = require("../models/MedicalGuideline"); // Ensure the model exists

// Add Medical Guideline
router.post("/upload", async (req, res) => {
  try {
    const { title, link } = req.body;

    if (!title || !link) {
      return res.status(400).json({ message: "Title and link are required" });
    }

    const newGuideline = new MedicalGuideline({ title, link });
    await newGuideline.save();

    res.status(201).json({ message: "Guideline uploaded successfully" });
  } catch (error) {
    console.error("Error uploading guideline:", error);
    res.status(500).json({ message: "Failed to upload guideline" });
  }
});

module.exports = router;
