import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const HealthRecords = () => {
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient-dashboard/health-data");
        setHealthData(response.data.healthData);
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    fetchHealthData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Health Records
      </Typography>
      {healthData ? (
        <List>
          {healthData.medicalHistory.map((record, index) => (
            <ListItem key={index}>
              <ListItemText primary={record} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default HealthRecords;
