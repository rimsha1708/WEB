const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing"); // Correct capitalization



// Generate Bill
router.post("/generate", async (req, res) => {
  const { patientName, amount, status } = req.body;
  try {
    const bill = new Billing({ patientName, amount, status });
    await bill.save();
    res.status(201).json({ message: "Bill generated successfully", bill });
  } catch (error) {
    res.status(500).json({ message: "Error generating bill", error });
  }
});

// Get All Bills
router.get("/", async (req, res) => {
  try {
    const bills = await Billing.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills", error });
  }
});

// Update Bill Status
router.put("/:id", async (req, res) => {
  try {
    const updatedBill = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: "Error updating bill", error });
  }
});

// Delete a Bill
router.delete("/:id", async (req, res) => {
  try {
    await Billing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bill", error });
  }
});

module.exports = router;