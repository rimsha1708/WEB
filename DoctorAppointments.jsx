import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}/appointments`);
      setAppointments(response.data);
    };
    fetchAppointments();
  }, [doctorId]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Doctor's Appointments</Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment._id}>
            <ListItemText
              primary={`Patient: ${appointment.patientName}`}
              secondary={`Date: ${appointment.date} | Time: ${appointment.time}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DoctorAppointments;
