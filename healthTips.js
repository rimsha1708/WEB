const express = require("express");
const router = express.Router();
const HealthTip = require("../models/HealthTip");

// Add a new health tip
router.post("/add", async (req, res) => {
  const { content } = req.body;

  try {
    const newHealthTip = new HealthTip({ content });
    await newHealthTip.save();
    res.status(201).json({ message: "Health tip added successfully", healthTip: newHealthTip });
  } catch (error) {
    console.error("Error adding health tip:", error);
    res.status(500).json({ message: "Failed to add health tip", error });
  }
});

// Get all health tips
router.get("/", async (req, res) => {
  try {
    const healthTips = await HealthTip.find().sort({ createdAt: -1 });
    res.status(200).json(healthTips);
  } catch (error) {
    console.error("Error fetching health tips:", error);
    res.status(500).json({ message: "Failed to fetch health tips", error });
  }
});

module.exports = router;
