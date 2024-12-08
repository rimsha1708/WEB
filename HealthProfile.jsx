import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const HealthProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/health-records/123/profile" // Replace 123 with user ID
        );
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching health profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/health-records/123/profile", // Replace 123 with user ID
        profile
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

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
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Health Profile
      </Typography>
      {profile ? (
        <Box
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            color: "#000",
            boxShadow: 3,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={profile.name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={profile.age || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Blood Group"
            name="bloodGroup"
            value={profile.bloodGroup || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Allergies"
            name="allergies"
            value={profile.allergies ? profile.allergies.join(", ") : ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                allergies: e.target.value.split(",").map((item) => item.trim()),
              })
            }
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <TextField
            label="Chronic Conditions"
            name="chronicConditions"
            value={
              profile.chronicConditions
                ? profile.chronicConditions.join(", ")
                : ""
            }
            onChange={(e) =>
              setProfile({
                ...profile,
                chronicConditions: e.target.value
                  .split(",")
                  .map((item) => item.trim()),
              })
            }
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            {!isEditing ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#1976D2", color: "#fff" }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#f44336", color: "#fff" }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center" }}>
          No profile data available.
        </Typography>
      )}
    </Box>
  );
};

export default HealthProfile;
