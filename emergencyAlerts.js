const express = require("express");
const EmergencyAlert = require("../models/EmergencyAlert");
const router = express.Router();

// Send Emergency Alert
router.post("/send", async (req, res) => {
  const { message } = req.body;

  try {
    const alert = new EmergencyAlert({ message });
    await alert.save();
    res.status(201).json({ message: "Emergency alert sent successfully", alert });
  } catch (error) {
    res.status(500).json({ message: "Failed to send alert", error });
  }
});

// Get Alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await EmergencyAlert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alerts", error });
  }
});

module.exports = router;
