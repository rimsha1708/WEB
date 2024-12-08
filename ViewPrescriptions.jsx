import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const ViewPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patientId = "123"; // Replace with the actual logged-in patient's ID

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/prescriptions/${patientId}`
        );
        setPrescriptions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load prescriptions. Please try again later.");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

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
          sx={{ color: "#ffffff", marginLeft: "1rem", fontWeight: "bold" }}
        >
          Loading Prescriptions...
        </Typography>
      </Box>
    );
  }

  if (error) {
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
        <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
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
        Your Prescriptions
      </Typography>
      <Grid container spacing={3}>
        {prescriptions.map((prescription) => (
          <Grid item xs={12} key={prescription._id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                padding: "1rem",
                backgroundColor: "#ffffff",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    marginBottom: "0.5rem",
                  }}
                >
                  {prescription.doctorName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#333", marginBottom: "0.3rem" }}
                >
                  <strong>Medication:</strong> {prescription.medication}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "0.3rem" }}
                >
                  <strong>Dosage:</strong> {prescription.dosage}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "0.3rem" }}
                >
                  <strong>Instructions:</strong> {prescription.instructions}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#757575", fontStyle: "italic" }}
                >
                  <strong>Date:</strong>{" "}
                  {new Date(prescription.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  marginLeft: "2rem",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    marginBottom: "0.5rem",
                  }}
                >
                  {prescription.status}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewPrescriptions;
