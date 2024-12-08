import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const UpdateAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState("");
  const [formData, setFormData] = useState({
    doctorName: "",
    patientName: "",
    date: "",
    time: "",
    reason: "",
  });

  // Fetch all appointments from the database
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/appointments/update/${appointmentId}`, formData);
      alert("Appointment updated successfully!");
      setAppointmentId("");
      setFormData({
        doctorName: "",
        patientName: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      alert("Failed to update appointment.");
    }
  };

  const handleSelectAppointment = (appointment) => {
    setAppointmentId(appointment._id);
    setFormData({
      doctorName: appointment.doctorName,
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to right, #42a5f5, #478ed1)",
        padding: 2,
      }}
    >
      {/* Left Column: Appointment List */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: 3,
          marginRight: 2,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Available Appointments
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <List>
          {appointments.map((appointment) => (
            <ListItem
              button
              key={appointment._id}
              onClick={() => handleSelectAppointment(appointment)}
              sx={{
                marginBottom: 1,
                padding: 2,
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ListItemText
                primary={`Doctor: ${appointment.doctorName} - Patient: ${appointment.patientName}`}
                secondary={`Date: ${appointment.date} | Time: ${appointment.time}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Column: Update Form */}
      <Box
        sx={{
          flex: 2,
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: 5,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          overflowY: "auto",
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
          Update Appointment
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Doctor Name"
                name="doctorName"
                variant="outlined"
                fullWidth
                value={formData.doctorName}
                onChange={handleChange}
                sx={{ marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Patient Name"
                name="patientName"
                variant="outlined"
                fullWidth
                value={formData.patientName}
                onChange={handleChange}
                sx={{ marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                variant="outlined"
                fullWidth
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                name="time"
                type="time"
                variant="outlined"
                fullWidth
                value={formData.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reason"
                name="reason"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={formData.reason}
                onChange={handleChange}
                sx={{ marginBottom: 3 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              fontWeight: "bold",
              padding: 1,
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#2c387e" },
            }}
          >
            Update Appointment
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateAppointment;
