const express = require("express");
const router = express.Router();
const { getHealthData, getAppointments, getPrescriptions, getConsultationHistory } = require("../controllers/patientDashboardController");

// Health Records Management
router.get("/health-data", getHealthData);

// Appointment Management
router.get("/appointments", getAppointments);

// Prescription Management
router.get("/prescriptions", getPrescriptions);

// Consultation History
router.get("/consultations", getConsultationHistory);

module.exports = router;
