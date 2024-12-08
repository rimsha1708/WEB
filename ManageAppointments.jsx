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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");

  const patientId = "123"; // Replace with the actual logged-in patient's ID

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/manage/${patientId}`
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [patientId]);

  const handleUpdateAppointment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/update/${selectedAppointment._id}`,
        {
          date: updatedDate,
          time: updatedTime,
        }
      );
      alert(response.data.message);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === selectedAppointment._id
            ? { ...appointment, date: updatedDate, time: updatedTime }
            : appointment
        )
      );
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update the appointment. Please try again.");
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/appointments/cancel/${id}`
      );
      alert(response.data.message);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert(
        error.response?.data?.message ||
        "Failed to cancel the appointment. Please try again."
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

  return (
    <Box sx={{ backgroundColor: "#f0f4f8", minHeight: "100vh", padding: "2rem" }}>
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
        Manage Appointments
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
                <Typography
                  variant="body1"
                  sx={{ color: "#333", marginBottom: "0.3rem" }}
                >
                  <strong>Date:</strong> {appointment.date.split("T")[0]}
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
                  <strong>Reason:</strong> {appointment.reason}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setUpdatedDate(appointment.date.split("T")[0]);
                    setUpdatedTime(appointment.time);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCancelAppointment(appointment._id)}
                >
                  Cancel
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      >
        <DialogTitle>Update Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedAppointment(null)}>Cancel</Button>
          <Button onClick={handleUpdateAppointment} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAppointments;
