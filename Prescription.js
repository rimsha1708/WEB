const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorName: { type: String, required: true },
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  instructions: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
