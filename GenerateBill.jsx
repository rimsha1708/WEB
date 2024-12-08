import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GenerateBill.css"; // Link to the CSS file

const GenerateBill = () => {
  const [formData, setFormData] = useState({
    userName: "",
    amount: 0,
    status: "Remaining",
  });

  const [users, setUsers] = useState([]); // For storing users
  const [totalAmount, setTotalAmount] = useState(0);

  const services = [
    { name: "Room Charges", price: 1000 },
    { name: "X-Ray", price: 500 },
    { name: "Blood Test", price: 200 },
    { name: "Medicines", price: 300 },
    { name: "Consultation", price: 800 },
  ];

  useEffect(() => {
    // Fetch users from the database
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data); // Update state with user data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []); // Run only once when the component mounts

  const handleServiceSelection = (e, price) => {
    if (e.target.checked) {
      setTotalAmount((prevAmount) => prevAmount + price);
    } else {
      setTotalAmount((prevAmount) => prevAmount - price);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const billData = {
        patientName: formData.userName,
        amount: totalAmount,
        status: formData.status,
      };
      console.log("Sending billData to API:", billData); // Debugging payload
      await axios.post("http://localhost:5000/api/billing/generate", billData);
      alert("Bill generated successfully!");
      setFormData({ userName: "", amount: 0, status: "Remaining" });
      setTotalAmount(0);
    } catch (error) {
      console.error("Error generating bill:", error.response?.data || error.message);
      alert("Error generating bill.");
    }
  };

  return (
    <div className="generate-bill-container">
      <h2 className="title">Generate Bill</h2>
      <form onSubmit={handleSubmit} className="form-card">
        {/* User Name Dropdown */}
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <select
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Services with Checkboxes */}
        <div className="form-group">
          <label>Services:</label>
          {services.map((service, index) => (
            <div className="checkbox-group" key={index}>
              <input
                type="checkbox"
                id={service.name}
                onChange={(e) => handleServiceSelection(e, service.price)}
              />
              <label htmlFor={service.name} className="service-label">
                {service.name} - ${service.price}
              </label>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="form-group">
          <label>Total Amount:</label>
          <input type="text" value={`$${totalAmount}`} readOnly />
        </div>

        {/* Status Dropdown */}
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Submitted">Submitted</option>
            <option value="Remaining">Remaining</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Generate Bill
        </button>
      </form>
    </div>
  );
};

export default GenerateBill;
