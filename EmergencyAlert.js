const mongoose = require("mongoose");

const emergencyAlertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmergencyAlert", emergencyAlertSchema);
