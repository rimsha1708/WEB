import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const BookVideoConsultations = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookConsultation = () => {
    // Redirect to a static Google Meet link
    const meetLink = "https://meet.google.com/oey-jorv-grs?authuser=0";
    window.open(meetLink, "_blank"); // Open the link in a new tab
  };

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Book Video Consultations
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Book Consultation
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Doctor</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor._id} value={doctor.name}>
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleBookConsultation} variant="contained">
            Create Meet Link
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookVideoConsultations;
