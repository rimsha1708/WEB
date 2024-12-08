import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const FeedbackOnConsultations = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
        if (response.data.length > 0) {
          setSelectedDoctor(response.data[0]._id); // Automatically select the first doctor
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setErrorMessage("Failed to fetch doctor list.");
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      setErrorMessage("Feedback cannot be empty.");
      return;
    }
  
    if (!selectedDoctor) {
      setErrorMessage("Please select a doctor.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/feedback", {
        patientName: "Test Patient", // Replace with dynamic value if available
        doctorEmail: selectedDoctor, // Assuming `selectedDoctor` is the doctor's email
        message: feedback,
      });
      setSuccessMessage("Feedback submitted successfully!");
      setFeedback(""); // Clear the feedback field
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("An error occurred while submitting feedback.");
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "1rem",
          fontWeight: "bold",
          color: "#1976D2",
        }}
      >
        Feedback on Consultations
      </Typography>
      {/* Doctor Selection Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
        <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
        <Select
          labelId="doctor-select-label"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor._id} value={doctor._id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Feedback Text Field */}
      <TextField
        variant="outlined"
        multiline
        rows={4}
        placeholder="Write your feedback..."
        fullWidth
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />
      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: "100%" }}
      >
        Submit Feedback
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackOnConsultations;
