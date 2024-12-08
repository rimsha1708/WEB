import React, { useState } from "react";
import axios from "axios";

const UploadMedicalGuidelines = () => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/medical-guidelines/upload", formData);
      alert("Guideline uploaded successfully!");
      setFormData({ title: "", link: "" });
    } catch (error) {
      console.error("Error uploading guideline:", error);
      alert("Failed to upload guideline.");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#42a5f5", minHeight: "100vh" }}>
      <h1>Upload Medical Guideline</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="link"
          placeholder="Enter link"
          value={formData.link}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadMedicalGuidelines;
