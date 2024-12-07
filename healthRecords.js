const express = require("express");
const mongoose = require("mongoose"); // Import mongoose
const HealthRecord = require("../models/HealthRecord");

const router = express.Router();




// Static health alerts and profiles for prototyping
const healthProfiles = {
  "123": {
    name: "John Doe",
    age: 29,
    bloodGroup: "O+",
    allergies: ["Peanuts", "Pollen"],
    chronicConditions: ["Asthma"],
  },
};

const healthAlerts = [
  {
    id: 1,
    title: "High Blood Pressure Detected",
    description: "Your recent blood pressure readings are above the normal range.",
    date: "2024-12-01",
  },
  {
    id: 2,
    title: "High Cholesterol Alert",
    description: "Your cholesterol levels are higher than recommended.",
    date: "2024-12-02",
  },
  {
    id: 3,
    title: "Low Vitamin D Levels",
    description: "Consider taking vitamin D supplements.",
    date: "2024-12-03",
  },
];

// Routes for static health profiles and alerts

// GET Health Alerts
router.get("/:userId/alerts", (req, res) => {
  res.status(200).json(healthAlerts);
});

// GET Health Profile
router.get("/:userId/profile", (req, res) => {
  const { userId } = req.params;
  const profile = healthProfiles[userId];
  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

// PUT Update Health Profile
router.put("/:userId/profile", (req, res) => {
  const { userId } = req.params;
  const updatedProfile = req.body;
  if (healthProfiles[userId]) {
    healthProfiles[userId] = updatedProfile;
    res.status(200).json({ message: "Profile updated successfully" });
  } else {
    res.status(404).json({ message: "Profile not found to update" });
  }
});

// MongoDB-based routes

// GET /api/health-records/:id
router.get("/health-records/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Requested ID:", id); // Log the requested ID

  try {
    const healthRecord = await HealthRecord.findById(id);
    console.log("Health Record Found:", healthRecord); // Log the database response

    if (!healthRecord) {
      return res.status(404).json({ error: "Health record not found" });
    }

    res.status(200).json(healthRecord);
  } catch (error) {
    console.error("Error fetching health record:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router;
