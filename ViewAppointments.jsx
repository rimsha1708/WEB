import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(response.data);
      } catch (error) {
        alert("Failed to fetch appointments.");
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #42a5f5, #478ed1)",
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: 4,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          All Appointments
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  Doctor Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  Patient Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  Reason
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment._id}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default ViewAppointments;