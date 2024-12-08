import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Home, People, Event, Assessment, Notifications, Payment, Settings } from "@mui/icons-material";

const Sidebar = () => {
  const menuItems = [
    { label: "Overview", icon: <Home /> },
    { label: "Doctors", icon: <People /> },
    { label: "Appointments", icon: <Event /> },
    { label: "Reports", icon: <Assessment /> },
    { label: "Send Notifications", icon: <Notifications /> },
    { label: "Billing", icon: <Payment /> },
    { label: "Content Management", icon: <Settings /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#f8f9fa",
        boxShadow: 3,
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ maxWidth: "100%", borderRadius: "50%" }}
        />
        <Typography variant="h6" sx={{ mt: 1 }}>
          RIZA
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
