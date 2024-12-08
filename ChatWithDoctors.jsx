import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ChatWithDoctors = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Fetch the list of doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
        if (response.data.length > 0) {
          setSelectedDoctor(response.data[0]._id); // Automatically select the first doctor
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch existing chat messages for the selected doctor
  useEffect(() => {
    if (!selectedDoctor) return;

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat?doctorId=${selectedDoctor}&patientId=patient123`
        );
        setChatMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [selectedDoctor]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        doctorId: selectedDoctor, // Selected doctor
        patientId: "patient123", // Replace with actual patient ID
        sender: "patient", // Indicate whether the sender is a doctor or patient
        message,
      });
      setChatMessages((prevMessages) => [...prevMessages, response.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#42A5F5",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "2rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#ffffff",
        }}
      >
        Chat with Doctor
      </Typography>
      {/* Doctor Selection */}
      <Box
        sx={{
          maxWidth: "700px",
          width: "100%",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <FormControl
          fullWidth
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 10, // Ensures dropdown visibility
          }}
        >
          <InputLabel
            id="doctor-select-label"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#1e88e5",
            }}
          >
            
          </InputLabel>
          <Select
            labelId="doctor-select-label"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            sx={{
              borderRadius: "0px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            {doctors.map((doctor) => (
              <MenuItem
                key={doctor._id}
                value={doctor._id}
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#424242",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* Chat Messages */}
      <Box
        sx={{
          maxWidth: "700px",
          width: "100%",
          height: "400px",
          overflowY: "auto",
          padding: "1rem",
          backgroundColor: "#ffffff",
          marginBottom: "1.5rem",
          borderRadius: "8px",
        }}
      >
        {chatMessages.length > 0 ? (
          chatMessages.map((chat, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  chat.sender === "patient" ? "flex-end" : "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    chat.sender === "patient" ? "#bbdefb" : "#ffccbc",
                  color: "#424242",
                  padding: "0.5rem 1rem",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", marginBottom: "0.2rem" }}
                >
                  {chat.sender === "patient" ? "You" : "Doctor"}
                </Typography>
                <Typography variant="body2">{chat.message}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              color: "#9e9e9e",
              marginTop: "1rem",
              fontStyle: "italic",
            }}
          >
            No messages yet. Start the conversation!
          </Typography>
        )}
      </Box>
      {/* Send Message */}
      <Box
        sx={{
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          gap: "1rem",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            padding: "0.8rem 1.5rem",
            backgroundColor: "#1e88e5",
            color: "#ffffff",
            borderRadius: "8px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWithDoctors;
