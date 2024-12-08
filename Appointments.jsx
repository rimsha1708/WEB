import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient-dashboard/appointments");
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(appointments.filter((appt) => appt._id !== id));
      alert("Appointment cancelled successfully.");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Appointments
      </Typography>
      {appointments.length > 0 ? (
        <List>
          {appointments.map((appt) => (
            <ListItem key={appt._id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={`Doctor: ${appt.doctorName}`}
                secondary={`Date: ${appt.date}, Time: ${appt.time}`}
              />
              <Button color="error" onClick={() => handleCancel(appt._id)}>
                Cancel
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No appointments found.</Typography>
      )}
    </Box>
  );
};

export default Appointments;
