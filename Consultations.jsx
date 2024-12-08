import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient-dashboard/consultations");
        setConsultations(response.data.consultations);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Consultations
      </Typography>
      {consultations.length > 0 ? (
        <List>
          {consultations.map((consultation) => (
            <ListItem key={consultation._id}>
              <ListItemText
                primary={`Doctor: ${consultation.doctorName}`}
                secondary={`Date: ${consultation.date}, Notes: ${consultation.notes}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No consultations found.</Typography>
      )}
    </Box>
  );
};

export default Consultations;
