import React, { useState } from "react";
import axios from "axios";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#42a5f5",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#fff" }}>
        Add Health Tips
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <textarea
          placeholder="Enter health tip here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            width: "100%",
            height: "150px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1rem",
            resize: "none",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#42a5f5",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#303f9f")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#42a5f5")}
        >
          Add Tip
        </button>
      </form>
    </div>
  );
};

export default AddHealthTips;
