const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");

// Get prescriptions by patient ID
router.get("/:patientId", async (req, res) => {
    const { patientId } = req.params;
    try {
      const prescriptions = await Prescription.find({ patientId });
      res.status(200).json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prescriptions", error });
    }
  });
  

module.exports = router;
