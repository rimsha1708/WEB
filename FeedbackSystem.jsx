import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackSystem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        alert("Failed to fetch feedbacks");
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleReply = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/feedback/reply/${id}`, { reply });
      alert("Reply sent successfully");
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((fb) =>
          fb._id === id ? { ...fb, reply } : fb
        )
      );
      setReply("");
    } catch (error) {
      alert("Failed to send reply");
    }
  };

  if (loading) {
    return <div>Loading feedbacks...</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1>User Feedbacks</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {feedbacks.map((fb) => (
          <li
            key={fb._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Feedback: {fb.feedback}</p>
            <p>Reply: {fb.reply || "No reply yet"}</p>
            <input
              type="text"
              placeholder="Write a reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              style={{
                padding: "8px",
                width: "80%",
                marginRight: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={() => handleReply(fb._id)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#42a5f5",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackSystem;
