const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

// Add a Doctor
router.post('/add', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Error saving doctor:', error.message);
      res.status(500).json({ error: 'Failed to add doctor', details: error.message });
    }
  }
});

// Update a Doctor
router.put('/update/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update doctor', details: error.message });
  }
});

// Delete a Doctor
router.delete('/delete/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete doctor', details: error.message });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
});

// Get Doctor's Appointments
router.get('/:id/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});

module.exports = router;
