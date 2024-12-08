import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/patient-dashboard/prescriptions"
        );
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleRefillRequest = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/prescriptions/${id}/refill`);
      alert("Refill request sent successfully.");
    } catch (error) {
      console.error("Error requesting refill:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} sx={{ textAlign: "center", fontWeight: "bold" }}>
        Your Prescriptions
      </Typography>
      {prescriptions.length > 0 ? (
        <Grid container spacing={3}>
          {prescriptions.map((prescription) => (
            <Grid item xs={12} key={prescription._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 2,
                  boxShadow: 3,
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  overflow: "auto",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Box sx={{ marginRight: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1976D2" }}
                    >
                      {prescription.medicationName}
                    </Typography>
                    <Typography color="textSecondary">
                      <b>Doctor:</b> {prescription.doctorName}
                    </Typography>
                  </Box>
                  <Box sx={{ marginRight: 3 }}>
                    <Typography color="textSecondary">
                      <b>Dosage:</b> {prescription.dosage}
                    </Typography>
                    <Typography color="textSecondary">
                      <b>Instructions:</b> {prescription.instructions}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="textSecondary">
                      <b>Date:</b> {prescription.date}
                    </Typography>
                  </Box>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRefillRequest(prescription._id)}
                  sx={{ marginLeft: 3 }}
                >
                  Request Refill
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No prescriptions found.</Typography>
      )}
    </Box>
  );
};

export default Prescriptions;
