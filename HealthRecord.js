const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  allergies: [String],
  chronicConditions: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
