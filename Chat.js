const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    sender: { type: String, required: true }, // "doctor" or "patient"
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
