import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import axios from "axios";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        console.log("Feedback data:", response.data); // Debugging log
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // Function to notify the doctor
  const notifyDoctor = async (doctorEmail) => {
    try {
      // Simulate notifying the doctor (replace with actual API call if needed)
      console.log(`Notifying doctor: ${doctorEmail}`);
      alert(`Notification sent to doctor: ${doctorEmail}`);
    } catch (error) {
      console.error("Error notifying doctor:", error);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#d7ebff", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#1976D2", fontWeight: "bold" }}>
        Patient Feedback
      </Typography>
      <List>
        {feedback.length === 0 ? (
          <Typography>No feedback available</Typography>
        ) : (
          feedback.map((item, index) => (
            <React.Fragment key={item._id || index}>
              <ListItem
                alignItems="flex-start"
                sx={{ backgroundColor: "#ffffff", mb: 2, borderRadius: "5px", p: 2 }}
              >
                <ListItemText
                  primary={`Message: ${item.message}`}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        Patient: {item.patientName || "N/A"}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Doctor: {item.doctorEmail || "N/A"}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Submitted on: {new Date(item.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                {/* Notify Doctor Button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                  onClick={() => notifyDoctor(item.doctorEmail)}
                >
                  Notify Doctor
                </Button>
              </ListItem>
              {index < feedback.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
};

export default FeedbackPage;
