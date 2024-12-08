import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const HealthRecordManagement = ({ userId }) => {
  const [healthRecord, setHealthRecord] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState("");
  const [dailyLog, setDailyLog] = useState({ diet: "", symptoms: "" });
  const [healthAlert, setHealthAlert] = useState("");
  const [profile, setProfile] = useState({ allergies: [], chronicConditions: [] });

  // Fetch health records
  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/health-record/${userId}`);
        setHealthRecord(response.data);
      } catch (error) {
        console.error("Error fetching health record:", error);
      }
    };
    fetchHealthRecord();
  }, [userId]);

  // Handle dropdown change
  const handleFeatureChange = (event) => {
    setSelectedFeature(event.target.value);
  };

  // Submit daily log
  const handleDailyLogSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/health-record/${userId}/daily-log`,
        dailyLog
      );
      setHealthRecord(response.data);
      setDailyLog({ diet: "", symptoms: "" });
    } catch (error) {
      console.error("Error submitting daily log:", error);
    }
  };

  // Submit health alert
  const handleAlertSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/health-record/${userId}/alerts`,
        { message: healthAlert }
      );
      setHealthRecord(response.data);
      setHealthAlert("");
    } catch (error) {
      console.error("Error submitting health alert:", error);
    }
  };

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/health-record/${userId}/profile`,
        profile
      );
      setHealthRecord(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Health Record Management
      </Typography>
      <Select
        value={selectedFeature}
        onChange={handleFeatureChange}
        displayEmpty
        fullWidth
        sx={{ mb: 3 }}
      >
        <MenuItem value="">Select a Feature</MenuItem>
        <MenuItem value="view">View Personal Health Data</MenuItem>
        <MenuItem value="dailyLog">Personal Health Journal</MenuItem>
        <MenuItem value="alerts">Health Alerts</MenuItem>
        <MenuItem value="profile">Update Health Profile</MenuItem>
      </Select>

      {/* Feature Content */}
      {selectedFeature === "view" && healthRecord && (
        <Box>
          <Typography variant="h6">Medical History:</Typography>
          <List>
            {healthRecord.medicalHistory.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Lab Results:</Typography>
          <List>
            {healthRecord.labResults.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Prescriptions:</Typography>
          <List>
            {healthRecord.prescriptions.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {selectedFeature === "dailyLog" && (
        <Box>
          <Typography variant="h6">Add Daily Health Log:</Typography>
          <TextField
            label="Diet"
            fullWidth
            sx={{ mb: 2 }}
            value={dailyLog.diet}
            onChange={(e) => setDailyLog({ ...dailyLog, diet: e.target.value })}
          />
          <TextField
            label="Symptoms"
            fullWidth
            sx={{ mb: 2 }}
            value={dailyLog.symptoms}
            onChange={(e) => setDailyLog({ ...dailyLog, symptoms: e.target.value })}
          />
          <Button variant="contained" onClick={handleDailyLogSubmit}>
            Submit
          </Button>
        </Box>
      )}

      {selectedFeature === "alerts" && (
        <Box>
          <Typography variant="h6">Add Health Alert:</Typography>
          <TextField
            label="Alert Message"
            fullWidth
            sx={{ mb: 2 }}
            value={healthAlert}
            onChange={(e) => setHealthAlert(e.target.value)}
          />
          <Button variant="contained" onClick={handleAlertSubmit}>
            Submit
          </Button>
        </Box>
      )}

      {selectedFeature === "profile" && (
        <Box>
          <Typography variant="h6">Update Health Profile:</Typography>
          <TextField
            label="Allergies (comma separated)"
            fullWidth
            sx={{ mb: 2 }}
            value={profile.allergies.join(", ")}
            onChange={(e) =>
              setProfile({ ...profile, allergies: e.target.value.split(",") })
            }
          />
          <TextField
            label="Chronic Conditions (comma separated)"
            fullWidth
            sx={{ mb: 2 }}
            value={profile.chronicConditions.join(", ")}
            onChange={(e) =>
              setProfile({
                ...profile,
                chronicConditions: e.target.value.split(","),
              })
            }
          />
          <Button variant="contained" onClick={handleProfileUpdate}>
            Update Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HealthRecordManagement;
