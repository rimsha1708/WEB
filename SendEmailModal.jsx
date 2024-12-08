import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const SendEmailModal = ({ open, onClose, recipientType }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      await axios.post("http://localhost:5000/api/notifications/send", {
        recipientType,
        email,
        subject,
        message,
      });
      alert("Email sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Notify {recipientType.charAt(0).toUpperCase() + recipientType.slice(1)}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          label="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSend}
          sx={{ mt: 2 }}
        >
          Send Email
        </Button>
      </Box>
    </Modal>
  );
};

export default SendEmailModal;
