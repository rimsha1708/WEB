import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeeBill.css"; // Optional CSS file for styling

const SeeBill = () => {
  const [bills, setBills] = useState([]);
  const [editBillId, setEditBillId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    patientName: "",
    amount: "",
    status: "",
  });

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

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the edit button click
  const handleEditClick = (bill) => {
    setEditBillId(bill._id);
    setEditFormData({
      patientName: bill.patientName,
      amount: bill.amount,
      status: bill.status,
    });
  };

  // Handle the save button click to update the bill
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/billing/${editBillId}`, editFormData);
      alert("Bill updated successfully!");

      // Update the UI with the new data
      setBills((prevBills) =>
        prevBills.map((bill) =>
          bill._id === editBillId ? { ...bill, ...editFormData } : bill
        )
      );

      setEditBillId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Error updating bill.");
    }
  };

  // Handle the cancel button click to exit edit mode
  const handleCancelClick = () => {
    setEditBillId(null);
  };

  return (
    <div className="see-bill-container">
      <h1 className="title">See Bills</h1>
      <table className="bills-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              {editBillId === bill._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="patientName"
                      value={editFormData.patientName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={editFormData.amount}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditChange}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Remaining">Remaining</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSaveClick} className="save-btn">
                      Save
                    </button>
                    <button onClick={handleCancelClick} className="cancel-btn">
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{bill.patientName}</td>
                  <td>${bill.amount}</td>
                  <td>{bill.status}</td>
                  <td>
                    <button onClick={() => handleEditClick(bill)} className="edit-btn">
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeBill;
