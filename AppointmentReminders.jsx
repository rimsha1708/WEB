import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Card, CardContent, Grid } from "@mui/material";

const AppointmentReminders = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookedAppointments = async () => {
      try {
        const patientId = "actual-patient-id"; // Replace with a valid patient ID
        const response = await axios.get(
          `http://localhost:5000/api/booked-appointments/${patientId}`
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booked appointments:", err);
        setError(true);
        setLoading(false);
      }
    };
    
    
    fetchBookedAppointments();
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
        <CircularProgress sx={{ color: "#FFFFFF" }} />
        <Typography variant="h6" sx={{ color: "#FFFFFF", marginLeft: "1rem" }}>
          Loading Booked Appointments...
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
        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
          Failed to load booked appointments. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#42A5F5", minHeight: "100vh", padding: "2rem" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#FFFFFF",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          textTransform: "uppercase",
        }}
      >
        Appointment Reminders
      </Typography>
      <Grid container spacing={4}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment._id}>
            <Card
              sx={{
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2" }}>
                  {appointment.doctorName}
                </Typography>
                <Typography variant="body1" sx={{ color: "#333" }}>
                  <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Time:</strong> {appointment.time}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Reason:</strong> {appointment.reason}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AppointmentReminders;
