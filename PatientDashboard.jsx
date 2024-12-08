import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TipsAndUpdates } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Bar as BarChart,
  Doughnut as DoughnutChart,
} from "react-chartjs-2";
import {
  Home,
  Event,
  Receipt,
  Chat,
  Assignment,
  ExpandLess,
  ExpandMore,
  HelpOutline,
  Map,
  Logout,
} from "@mui/icons-material";
import "chart.js/auto";

import logo from "./logo.png";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [healthRecordsOpen, setHealthRecordsOpen] = useState(false);
  const [appointmentsOpen, setAppointmentsOpen] = useState(false);
  const [consultationsOpen, setConsultationsOpen] = useState(false);
  const [prescriptionsOpen, setPrescriptionsOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [helpQuery, setHelpQuery] = useState("");
  const [bmiDialogOpen, setBmiDialogOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const stats = [
    { title: "Appointments", value: "25", description: "5 upcoming this week" },
    { title: "Prescriptions", value: "50", description: "2 refills pending" },
    { title: "Consultations", value: "15", description: "3 new consultations" },
    { title: "Health Records", value: "128", description: "New lab results added" },
  ];

  const barChartData = {
    labels: ["Appointments", "Prescriptions", "Consultations", "Health Records"],
    datasets: [
      {
        label: "Data Count",
        data: [25, 50, 15, 128],
        backgroundColor: "#42A5F5",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Appointments", "Prescriptions", "Consultations", "Health Records"],
    datasets: [
      {
        data: [25, 50, 15, 128],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  const openGoogleMaps = () => {
    window.open("https://www.google.com/maps", "_blank");
  };

  const openHealthTips = () => {
    window.open("https://www.youtube.com/results?search_query=health+tips", "_blank");
  };

  const menuItems = [
    { icon: <Home />, label: "Overview", route: "/overview" },
    {
      icon: <Event />,
      label: "Appointments",
      children: [
        { label: "Search for Doctors", route: "/search-doctors" },
        { label: "Book Appointments", route: "/book-appointments" },
        { label: "View Appointment History", route: "/appointment-history" },
        { label: "Cancel or Reschedule Appointments", route: "/manage-appointments" },
      ],
    },
    {
      icon: <Receipt />,
      label: "Prescriptions",
      children: [{ label: "View Prescriptions", route: "/view-prescriptions" }],
    },
    {
      icon: <Chat />,
      label: "Consultations",
      children: [
        { label: "Book Video Consultations", route: "/book-video-consultations" },
        { label: "Chat with Doctors", route: "/chat-with-doctors" },
        { label: "Feedback on Consultations", route: "/feedback-on-consultations" },
      ],
    },
    {
      icon: <Assignment />,
      label: "Health Records",
      children: [
        { label: "View Personal Health Data", route: "/personal-health-data" },
        { label: "Daily Health Log", route: "/daily-health-log" },
        { label: "Health Alerts", route: "/health-alerts" },
        { label: "Calculate BMI", onClick: () => setBmiDialogOpen(true) },
      ],
    },
    {
      icon: <TipsAndUpdates />,
      label: "Health Tips",
      onClick: openHealthTips,
    },
  ];

  const toggleDropdown = (label) => {
    switch (label) {
      case "Health Records":
        setHealthRecordsOpen(!healthRecordsOpen);
        break;
      case "Appointments":
        setAppointmentsOpen(!appointmentsOpen);
        break;
      case "Consultations":
        setConsultationsOpen(!consultationsOpen);
        break;
      case "Prescriptions":
        setPrescriptionsOpen(!prescriptionsOpen);
        break;
      default:
        break;
    }
  };

  const calculateBmi = () => {
    const heightInMeters = parseFloat(height) / 100;
    const calculatedBmi = parseFloat(weight) / (heightInMeters * heightInMeters);

    setBmi(calculatedBmi.toFixed(2));

    if (calculatedBmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      setBmiCategory("Normal weight");
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obesity");
    }
  };

  const handleCloseBmiDialog = () => {
    setBmiDialogOpen(false);
    setWeight("");
    setHeight("");
    setBmi(null);
    setBmiCategory("");
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const openHelpDialog = () => {
    setHelpDialogOpen(true);
  };

  const closeHelpDialog = () => {
    setHelpDialogOpen(false);
    setHelpQuery("");
  };

  const searchGoogle = () => {
    if (helpQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(helpQuery)}`, "_blank");
      closeHelpDialog();
    }
  };

  const handleLogout = () => {
    navigate("/"); // Replace "/" with the actual route for the Login/Signup page
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", backgroundColor: "#F5F5F5" }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, padding: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img src={logo} alt="RIZA Logo" style={{ maxWidth: "80%", borderRadius: "50%" }} />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: "#1976D2" }}>
            RIZA
          </Typography>
        </Box>
        <List>
          {menuItems.map((item, index) =>
            item.children ? (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => toggleDropdown(item.label)}
                  sx={{ color: "#000000" }}
                >
                  <ListItemIcon sx={{ color: "#000000" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {(item.label === "Health Records" && healthRecordsOpen) ||
                  (item.label === "Appointments" && appointmentsOpen) ||
                  (item.label === "Consultations" && consultationsOpen) ||
                  (item.label === "Prescriptions" && prescriptionsOpen) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={
                    (item.label === "Health Records" && healthRecordsOpen) ||
                    (item.label === "Appointments" && appointmentsOpen) ||
                    (item.label === "Consultations" && consultationsOpen) ||
                    (item.label === "Prescriptions" && prescriptionsOpen)
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child, idx) => (
                      <ListItem
                        button
                        key={idx}
                        sx={{ pl: 4, color: "#000000" }}
                        onClick={child.onClick || (() => handleNavigation(child.route))}
                      >
                        <ListItemText primary={child.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem
                button
                key={index}
                sx={{ color: "#000000" }}
                onClick={item.onClick || (() => handleNavigation(item.route))}
              >
                <ListItemIcon sx={{ color: "#000000" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            )
          )}
          <ListItem button onClick={openGoogleMaps} sx={{ color: "#000000" }}>
            <ListItemIcon sx={{ color: "#000000" }}>
              <Map />
            </ListItemIcon>
            <ListItemText primary="Open Google Maps" />
          </ListItem>
          <ListItem button onClick={openHelpDialog} sx={{ color: "#000000" }}>
            <ListItemIcon sx={{ color: "#000000" }}>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Need Help" />
          </ListItem>
          <ListItem button onClick={handleLogout} sx={{ color: "#000000" }}>
            <ListItemIcon sx={{ color: "#000000" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
          Hospital Management System
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderLeft: `5px solid ${index % 2 === 0 ? "#42A5F5" : "#FF6384"}` }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1">{stat.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
              Bar Chart
            </Typography>
            <BarChart
              data={barChartData}
              options={{ maintainAspectRatio: false }}
              style={{ maxHeight: "300px", maxWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
              Doughnut Chart
            </Typography>
            <DoughnutChart
              data={doughnutChartData}
              options={{ maintainAspectRatio: false }}
              style={{ maxHeight: "300px", maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* BMI Dialog */}
      <Dialog open={bmiDialogOpen} onClose={handleCloseBmiDialog}>
        <DialogTitle>Calculate BMI</DialogTitle>
        <DialogContent>
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Height (cm)"
            type="number"
            fullWidth
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          {bmi && (
            <Typography variant="body1">
              Your BMI: {bmi} ({bmiCategory})
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBmiDialog} color="secondary">
            Close
          </Button>
          <Button onClick={calculateBmi} color="primary">
            Calculate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={helpDialogOpen} onClose={closeHelpDialog}>
        <DialogTitle>Need Help</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter your query"
            fullWidth
            variant="outlined"
            value={helpQuery}
            onChange={(e) => setHelpQuery(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHelpDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={searchGoogle} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientDashboard;
