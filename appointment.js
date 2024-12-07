const express = require("express");
const {
  addAppointment,
  deleteAppointment,
  updateAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Add a new appointment
router.post("/add", addAppointment);

// Delete an appointment by ID
router.delete("/delete/:id", deleteAppointment);

// Update an appointment by ID
router.put("/update/:id", updateAppointment);

// Get all appointments
router.get("/", getAllAppointments);

router.post("/book-appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { patientId } = req.body; // Patient ID from the request body

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    if (appointment.bookedBy) {
      return res.status(400).json({ message: "This appointment is already booked." });
    }

    appointment.bookedBy = patientId; // Save the patient ID
    await appointment.save();

    res.status(200).json({ message: "Appointment booked successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to book appointment.", error });
  }
});

// Fetch appointments booked by a specific patient
router.get("/patient/:patientId/booked", async (req, res) => {
  const { patientId } = req.params;

  try {
    const bookedAppointments = await Appointment.find({ bookedBy: patientId });

    if (bookedAppointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this patient." });
    }

    res.status(200).json(bookedAppointments);
  } catch (error) {
    console.error("Error fetching booked appointments:", error);
    res.status(500).json({ message: "Failed to fetch booked appointments.", error });
  }
});

// Get booked appointments for a patient
// Get booked appointments for a specific patient
router.get("/booked-appointments/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    const bookedAppointments = await Appointment.find({ bookedBy: patientId });

    if (!bookedAppointments.length) {
      return res.status(404).json({ message: "No booked appointments found." });
    }

    res.status(200).json(bookedAppointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booked appointments.", error });
  }
});

// Book an appointment
router.post("/appointments/book-appointments/:id", async (req, res) => {
  const { id } = req.params; // Appointment ID
  const { patientId } = req.body; // Patient ID from request body

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    if (appointment.bookedBy) {
      return res
        .status(400)
        .json({ message: "This appointment is already booked." });
    }

    // Update the appointment to mark it as booked
    appointment.bookedBy = patientId; // Assign the patient ID
    appointment.booked = true; // Mark as booked
    await appointment.save();

    res.status(200).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Failed to book the appointment.", error });
  }
});
// Fetch appointment history for a specific patient
router.get("/history/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ bookedBy: patientId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointment history:", error);
    res.status(500).json({ message: "Failed to fetch appointment history." });
  }
});


// Get booked appointments for a patient
router.get("/manage/:patientId", async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await Appointment.find({ bookedBy: patientId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
});


// Update an appointment
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { date, time },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment", error });
  }
});

// Cancel an appointment
router.delete("/cancel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel appointment", error });
  }
});
module.exports = router;
