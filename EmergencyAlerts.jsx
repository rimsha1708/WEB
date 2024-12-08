import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const EmergencyAlerts = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/emergency-alerts/send", { message });
      alert("Emergency alert sent successfully!");
      setMessage("");
    } catch (error) {
      alert("Failed to send alert");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#42a5f5", // Solid blue background
        padding: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          maxWidth: 400,
          width: "90%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: 3, fontWeight: "bold", color: "#3f51b5" }}
        >
          Emergency Alerts
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter emergency alert message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              fontWeight: "bold",
              padding: 1.5,
              "&:hover": {
                backgroundColor: "#2c387e",
              },
            }}
          >
            Send Alert
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EmergencyAlerts;
