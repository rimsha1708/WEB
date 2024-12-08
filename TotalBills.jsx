import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TotalBills.css"; // Optional CSS file for styling

const TotalBills = () => {
  const [bills, setBills] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch bills from the database
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/billing");
        setBills(response.data);

        // Calculate total revenue from the fetched bills
        const revenue = response.data.reduce((acc, bill) => acc + bill.amount, 0);
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="total-bills-container">
      <h1 className="title">Total Bills</h1>

      {/* Display Total Revenue */}
      <div className="revenue-section">
        <h2>Total Revenue: ${totalRevenue}</h2>
      </div>

      {/* Display All Bills */}
      <div className="bills-table">
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.patientName}</td>
                  <td>${bill.amount}</td>
                  <td>{bill.status}</td>
                  <td>{new Date(bill.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No bills available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalBills;
