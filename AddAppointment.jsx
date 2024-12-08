import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControl,
} from "@mui/material";

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    patientName: "",
    date: "",
    time: "",
    reason: "",
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientResponse = await axios.get("http://localhost:5000/api/auth/patients");
        setPatients(patientResponse.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments/add", formData);
      alert("Appointment added successfully!");
      setFormData({
        doctorName: "",
        patientName: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      alert("Failed to add appointment.");
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
        backgroundColor: "#007BFF", // Solid blue background
      }}
    >
      <Paper
        elevation={0} // Removes shadow
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 500,
          width: "90%",
          backgroundColor: "#ffffff", // White form background
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Add Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Doctor Name"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  select
                  label="Patient Name"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="" disabled>
                    Select Patient
                  </option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient.name}>
                      {patient.name}
                    </option>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#3f51b5",
                  padding: 1.5,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Add Appointment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddAppointment;
