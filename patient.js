const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient"); // Assuming the Patient model exists

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients." });
  }
});
router.get("/emails/patient", async (req, res) => {
  try {
    const patient = await User.findOne({ role: "patient" }); // Example query
    res.status(200).json({ email: patient.email });
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient email" });
  }
});
router.get("/emails/doctor", async (req, res) => {
  try {
    const doctor = await User.findOne({ role: "doctor" }); // Example query
    res.status(200).json({ email: doctor.email });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor email" });
  }
});

module.exports = router;
