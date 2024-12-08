import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";

const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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
          sx={{ marginLeft: "1rem", color: "#FFFFFF", fontWeight: "bold" }}
        >
          Loading Doctors...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#42A5F5",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#FFFFFF",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          textTransform: "uppercase",
        }}
      >
        Available Doctors
      </Typography>
      <Grid container spacing={4}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card
              sx={{
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
                backgroundColor: "#FFFFFF",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    marginBottom: "0.5rem",
                  }}
                >
                  {doctor.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#333", marginBottom: "0.3rem" }}
                >
                  <strong>Specialty:</strong> {doctor.specialty || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "0.3rem" }}
                >
                  <strong>Location:</strong> {doctor.location || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "0.3rem" }}
                >
                  <strong>Rating:</strong> {doctor.rating || "N/A"} / 5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchDoctors;
