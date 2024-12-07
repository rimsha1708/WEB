const mongoose = require("mongoose");

const medicalGuidelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicalGuideline", medicalGuidelineSchema);
