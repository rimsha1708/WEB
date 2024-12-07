const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  patientName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  bookedBy: { type: String, default: null },
  booked: { type: Boolean, default: false },
  attended: { type: Boolean, default: false }, // Field to track attendance
});

module.exports = mongoose.model("Appointment", appointmentSchema);
