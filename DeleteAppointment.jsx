import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const DeleteAppointment = () => {
  const [appointmentId, setAppointmentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/appointments/delete/${appointmentId}`);
      alert("Appointment deleted successfully!");
      setAppointmentId(""); // Clear the input field
    } catch (error) {
      alert("Failed to delete appointment. Please check the ID and try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #42a5f5, #478ed1)",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "500px",
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          Delete Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Appointment ID"
            variant="outlined"
            fullWidth
            required
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{
              fontWeight: "bold",
              padding: 1,
            }}
          >
            Delete Appointment
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default DeleteAppointment;
