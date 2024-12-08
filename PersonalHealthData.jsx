import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PersonalHealthData = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/health-records/67546627dbc355ea1f0e7efb"
        );
        console.log("API Response:", response.data); // Debugging log
        setHealthData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching personal health data:", error);
        setLoading(false);
      }
    };

    fetchData();
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
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#42A5F5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "600px",
          boxShadow: 3,
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#1976D2",
            }}
          >
            Personal Health Data
          </Typography>

          {healthData ? (
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={healthData.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Age" secondary={healthData.age} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Blood Group"
                  secondary={healthData.bloodGroup}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Allergies"
                  secondary={
                    healthData.allergies.length > 0
                      ? healthData.allergies.join(", ")
                      : "None"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Chronic Conditions"
                  secondary={
                    healthData.chronicConditions.length > 0
                      ? healthData.chronicConditions.join(", ")
                      : "None"
                  }
                />
              </ListItem>
            </List>
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#f44336" }}
            >
              No health data available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PersonalHealthData;
