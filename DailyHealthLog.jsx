import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const DailyHealthLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/health-records/123/daily-log" // Replace `123` with the actual user ID.
        );
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching daily health log:", error);
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#42A5F5", // Blue background for loading
        }}
      >
        <CircularProgress sx={{ color: "#ffffff" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#42A5F5", // Full blue background
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#FFFFFF",
          marginBottom: "2rem",
        }}
      >
        Daily Health Log
      </Typography>
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: "1.5rem",
              boxShadow: 3,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1976D2", // Blue text for the date
                  marginBottom: "0.5rem",
                }}
              >
                Date: {new Date(log.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555555" }}>
                <strong>Diet:</strong> {log.diet}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555555" }}>
                <strong>Symptoms:</strong> {log.symptoms || "None"}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          No logs available.
        </Typography>
      )}
    </Box>
  );
};

export default DailyHealthLog;
