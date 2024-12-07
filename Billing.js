const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Submitted", "Remaining"], default: "Remaining" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Billing", billingSchema);
