import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments/history/123" // Replace 123 with the patient ID
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointment history:", err);
        setError("Failed to load appointment history. Please try again later.");
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#42A5F5",
        }}
      >
        <CircularProgress sx={{ color: "#ffffff" }} />
        <Typography
          variant="h6"
          sx={{ marginLeft: "1rem", color: "#FFFFFF", fontWeight: "bold" }}
        >
          Loading Appointment History...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#42A5F5",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#1976D2",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          textTransform: "uppercase",
        }}
      >
        Appointment History
      </Typography>
      <Grid container spacing={2}>
        {appointments.map((appointment) => (
          <Grid item xs={12} key={appointment._id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
                padding: "1rem",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#1976D2",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginRight: "1rem",
                }}
              >
                {appointment.doctorName[0].toUpperCase()}
              </Box>
              <CardContent sx={{ flex: "1" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    marginBottom: "0.5rem",
                  }}
                >
                  Dr. {appointment.doctorName}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "0.3rem" }}>
                  <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
                  <strong>Time:</strong> {appointment.time}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
                  <strong>Reason:</strong> {appointment.reason}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "0.5rem",
                    fontWeight: "bold",
                    color: appointment.attended ? "#4CAF50" : "#F44336",
                  }}
                >
                  Status: {appointment.attended ? "Attended" : "Not Attended"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AppointmentHistory;
