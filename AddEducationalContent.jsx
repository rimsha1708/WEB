import React, { useState } from "react";
import axios from "axios";
import "./AddEducationalContent.css"; // Ensure this file exists

const AddEducationalContent = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/educational-content", formData);
      alert("Educational content added successfully!");
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding educational content:", error);
      alert("Failed to add educational content. Please try again.");
    }
  };

  return (
    <div className="add-educational-content-container">
      <h2 className="title">Add Educational Content</h2>
      <form onSubmit={handleSubmit} className="add-content-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter content title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter content description"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Add Content
        </button>
      </form>
    </div>
  );
};

export default AddEducationalContent;
