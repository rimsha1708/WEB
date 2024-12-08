import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { VideoCall } from "@mui/icons-material";
import axios from "axios";

const BookVideoConsultation = () => {
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleStartCall = async () => {
    if (!selectedDoctor) {
      alert("Please select a doctor");
      return;
    }

    // Generate Google Meet Link (replace with actual API call)
    try {
      const response = await fetch("https://api.example.com/create-meet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor: selectedDoctor }),
      });
      const data = await response.json();
      window.open(data.meetLink, "_blank"); // Open Meet in a new tab
    } catch (error) {
      console.error("Error creating Meet link:", error);
      alert("Failed to create a Google Meet call. Try again later.");
    }
  };

  return (
    <Box>
      <List>
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <VideoCall />
          </ListItemIcon>
          <ListItemText primary="Book Video Consultation" />
        </ListItem>
      </List>

      {/* Pop-up Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Doctor</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Choose a doctor for your video consultation:
              </Typography>
              <Select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                fullWidth
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor.name}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleStartCall} color="primary" variant="contained">
            Call
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookVideoConsultation;
