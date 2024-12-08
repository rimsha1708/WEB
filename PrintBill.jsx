import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PrintBill.css"; // Optional CSS file for styling

const PrintBill = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  // Fetch bills from the database
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/billing");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  const handleBillSelection = (e) => {
    const selectedId = e.target.value;
    const bill = bills.find((bill) => bill._id === selectedId);
    setSelectedBill(bill);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-bill-container">
      <h1 className="title">Print Bill</h1>

      {/* Dropdown to Select a Bill */}
      <div className="form-group">
        <label htmlFor="billSelect">Select Bill:</label>
        <select id="billSelect" onChange={handleBillSelection}>
          <option value="">Select a Bill</option>
          {bills.map((bill) => (
            <option key={bill._id} value={bill._id}>
              {bill.patientName} - ${bill.amount}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Bill */}
      {selectedBill && (
        <div className="bill-details">
          <h2>Bill Details</h2>
          <p><strong>Patient Name:</strong> {selectedBill.patientName}</p>
          <p><strong>Amount:</strong> ${selectedBill.amount}</p>
          <p><strong>Status:</strong> {selectedBill.status}</p>
          <p><strong>Date:</strong> {new Date(selectedBill.date).toLocaleString()}</p>

          {/* Print Button */}
          <button onClick={handlePrint} className="print-btn">
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default PrintBill;
