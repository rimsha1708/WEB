import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

const HealthAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/health-records/123/alerts" // Replace `123` with the actual user ID
        );
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching health alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#0D47A1", // Uniform dark blue background
        minHeight: "100vh",
        width: "100vw", // Ensures it spans the entire width
        margin: 0,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          textAlign: "center",
        }}
      >
        Health Alerts
      </Typography>
      {/* Alerts */}
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <Card
            key={alert.id}
            sx={{
              backgroundColor: "#1565C0",
              color: "#FFFFFF",
              maxWidth: "700px",
              width: "100%",
              marginBottom: "1.5rem",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "12px",
              padding: "1rem",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#BBDEFB",
                }}
              >
                {alert.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#E3F2FD",
                  marginBottom: "1rem",
                  lineHeight: "1.6",
                }}
              >
                {alert.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#B3E5FC",
                  fontStyle: "italic",
                  textAlign: "right",
                }}
              >
                Date: {new Date(alert.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          sx={{
            color: "#BBDEFB",
            fontSize: "1.5rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          No alerts available.
        </Typography>
      )}
    </Box>
  );
};

export default HealthAlerts;
