import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const BookAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleBookAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/appointments/book-appointments/${appointmentId}`,
        {
          patientId: "123", // Replace with the logged-in user's ID
        }
      );
      alert(response.data.message);
  
      // Update the UI to reflect the booking
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, bookedBy: "123", booked: true }
            : appointment
        )
      );
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert(
        err.response?.data?.message || "Failed to book the appointment. Please try again."
      );
    }
  };
  
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
          Loading Appointments...
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
        backgroundColor: "#42A5F5",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
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
        Available Appointments
      </Typography>
      <Grid container spacing={4}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment._id}>
            <Card
              sx={{
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                backgroundColor: appointment.booked ? "#F8F9FA" : "#FFFFFF",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: appointment.booked ? "#9E9E9E" : "#1976D2",
                    marginBottom: "0.5rem",
                  }}
                >
                  {appointment.doctorName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#333", marginBottom: "0.3rem" }}
                >
                  <strong>Date:</strong> {appointment.date}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "0.3rem" }}
                >
                  <strong>Time:</strong> {appointment.time}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "0.3rem" }}
                >
                  <strong>Specialty:</strong> {appointment.specialty}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={appointment.booked}
                  onClick={() => handleBookAppointment(appointment._id)}
                  fullWidth
                  sx={{
                    marginTop: "1rem",
                    backgroundColor: appointment.booked ? "#9E9E9E" : "#1976D2",
                    "&:hover": {
                      backgroundColor: appointment.booked
                        ? "#9E9E9E"
                        : "#1565C0",
                    },
                  }}
                >
                  {appointment.booked ? "Already Booked" : "Book Appointment"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookAppointments;
