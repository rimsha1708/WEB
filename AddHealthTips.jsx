import React, { useState } from "react";
import axios from "axios";
import "./AddHealthTips.css";

const AddHealthTips = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/health-tips/add", { content });
      alert("Health tip added successfully!");
      setContent("");
    } catch (error) {
      console.error("Error adding health tip:", error);
      alert("Failed to add health tip.");
    }
  };

  return (
    <div className="add-health-tips-container">
      <h1 className="title">Add Health Tips</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <textarea
          placeholder="Enter health tip here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="textarea"
        />
        <button type="submit" className="submit-btn">Add Tip</button>
      </form>
    </div>
  );
};

export default AddHealthTips;
