import React, { useState } from "react";
import logo from "./logo.png"; // Update with the correct path to your logo
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Card,
  Grid,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home,
  People,
  Add,
  Delete,
  Event,
  Search,
  ExpandLess,
  ExpandMore,
  List as ListIcon,
} from "@mui/icons-material";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Phone } from "@mui/icons-material"; // Add this line

import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  LocalHospital,
  Group,
  Work,
  Hotel,
  DirectionsCar,
  SupervisorAccount,
} from "@mui/icons-material";
//import { Event, ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
const drawerWidth = 240;

const AdminDashboard = () => {
  const [openDoctors, setOpenDoctors] = useState(false);
  const [openAppointments, setOpenAppointments] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);
  const [openContentManagement, setOpenContentManagement] = useState(false);
  const navigate = useNavigate(); // Ensure this is inside the component

  
  
  const handleBillingClick = () => {
    setOpenBilling(!openBilling);
  };

  const handleContentManagementClick = () => {
    setOpenContentManagement(!openContentManagement);
  };

  
  // Function to notify via email
  const notifyViaEmail = (email, subject) => {
    const body = `Dear ${subject.includes("Patient") ? "Patient" : "Doctor"},%0A%0AThis is an important notification.%0A%0ARegards,%0AHospital Management System`;
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
  };

  const handleDoctorsClick = () => {
    setOpenDoctors(!openDoctors);
  };

  const handleAppointmentsClick = () => {
    setOpenAppointments(!openAppointments);
  };

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const handleNotificationsClick = () => {
    setOpenNotifications(!openNotifications);
  };
  const handleLogout = () => {
    navigate("/"); // Navigate to the desired route
};

 // Function to initiate WhatsApp call
 const handleCall = () => {
  const phoneNumber = prompt("Enter the phone number to call via WhatsApp (include country code):");
  if (phoneNumber) {
      const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber : `+92${phoneNumber}`; // Add your default country code
      const whatsappURL = `https://wa.me/${formattedNumber}`;
      alert("You will be redirected to WhatsApp. Please initiate the call from there.");
      window.open(whatsappURL, "_blank");
  }
};


// Function to send a WhatsApp message
const handleSendMessage = () => {
  const phoneNumber = prompt("Enter the phone number to send a WhatsApp message (include country code):");
  const message = prompt("Enter the message to send:");
  if (phoneNumber && message) {
    // Ensure the phone number starts with a "+" or add a default country code
    const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber : `+92${phoneNumber}`;
    // Encode the message
    const encodedMessage = encodeURIComponent(message);
    // Open WhatsApp with the message in the text box
    const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  } else {
    alert("Phone number and message are required.");
  }
};


  // Mock Data for Dashboard Cards
  const stats = [
    {
      title: "Doctors",
      count: 128,
      subtext: "3 doctors joined today",
      icon: <LocalHospital />,
    },
    {
      title: "Patients",
      count: "155K",
      subtext: "122 new patients admitted",
      icon: <Group />,
    },
    {
      title: "Staffs",
      count: 452,
      subtext: "12 staffs are on vacation",
      icon: <Work />,
    },
    {
      title: "Beds",
      count: 142,
      subtext: "10 beds remaining usable",
      icon: <Hotel />,
    },
    {
      title: "Ambulances",
      count: 120,
      subtext: "19 ambulances in service",
      icon: <DirectionsCar />,
    },
    {
      title: "Representatives",
      count: 12,
      subtext: "6 representatives active",
      icon: <SupervisorAccount />,
    },
  ];

  // Mock Chart Data
  const barData = {
    labels: ["Doctor", "Patient", "Staff", "Bed", "Ambulance"],
    datasets: [
      {
        label: "Count",
        data: [95, 380, 285, 140, 120],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Doctors", "Patients", "Staffs", "Beds", "Ambulances"],
    datasets: [
      {
        data: [130, 190, 200, 140, 120],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#7B1FA2"],
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            textAlign: "center",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="RIZA Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid #3f51b5",
              padding: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "10px",
            }}
          />
          <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
            RIZA
          </Typography>
        </Box>
        <Divider />
        <List>
          {/* Overview */}
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>

         {/* Doctors Dropdown */}
<ListItem button onClick={handleDoctorsClick}>
  <ListItemIcon>
    <People />
  </ListItemIcon>
  <ListItemText primary="Doctors" />
  {openDoctors ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openDoctors} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <ListItem button component={Link} to="/doctors/add" sx={{ pl: 4 }}>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Add Doctor" />
    </ListItem>
    <ListItem button component={Link} to="/doctors/manage" sx={{ pl: 4 }}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Doctors" />
    </ListItem>
    <ListItem button component={Link} to="/feedback" sx={{ pl: 4 }}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="View Feedback" />
    </ListItem>
  </List>
</Collapse>


          {/* Appointments Dropdown */}
          <ListItem button onClick={handleAppointmentsClick}>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
            {openAppointments ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAppointments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/add-appointment" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add Appointment" />
              </ListItem>
              <ListItem button component={Link} to="/delete-appointment" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Delete Appointment" />
              </ListItem>
              <ListItem button component={Link} to="/update-appointment" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                <ListItemText primary="Update Appointment" />
              </ListItem>
              <ListItem button component={Link} to="/view-appointments" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="View All Appointments" />
              </ListItem>
            </List>
          </Collapse>

          {/* Reports Dropdown */}
          <ListItem button onClick={handleReportsClick}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {openReports ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openReports} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/reports/appointments">
                <ListItemText primary="See Report" />
              </ListItem>
              <ListItem button component={Link} to="/reports/doctors">
                
              </ListItem>
            </List>
          </Collapse>

         {/* Notifications Dropdown */}
<ListItem button onClick={handleNotificationsClick}>
  <ListItemIcon>
    <Event />
  </ListItemIcon>
  <ListItemText primary="Send Notifications" />
  {openNotifications ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openNotifications} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <ListItem
      button
      onClick={() => notifyViaEmail("patient@example.com", "Patient Notification")}
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Notify Patient" />
    </ListItem>
    <ListItem
      button
      onClick={() => notifyViaEmail("doctor@example.com", "Doctor Notification")}
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Notify Doctor" />
    </ListItem>
    <ListItem button onClick={handleCall} sx={{ pl: 4 }}>
      <ListItemIcon>
        <Phone />
      </ListItemIcon>
      <ListItemText primary="Call" />
    </ListItem>
    <ListItem button onClick={handleSendMessage} sx={{ pl: 4 }}>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Send Message" />
    </ListItem>
  </List>
</Collapse>


          

<ListItem button onClick={handleBillingClick}>
  <ListItemIcon>
    <Event /> {/* Replace with an appropriate icon */}
  </ListItemIcon>
  <ListItemText primary="Billing" />
  {openBilling ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openBilling} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <ListItem button component={Link} to="/generate-bill" sx={{ pl: 4 }}>
      <ListItemText primary="Generate Bill" />
    </ListItem>
    <ListItem button component={Link} to="/see-bill" sx={{ pl: 4 }}>
      <ListItemText primary="See Bill" />
    </ListItem>
    <ListItem button component={Link} to="/print-bill" sx={{ pl: 4 }}>
      <ListItemText primary="Print Bill" />
    </ListItem>
    <ListItem button component={Link} to="/total-bills" sx={{ pl: 4 }}>
      <ListItemText primary="Total Bills" />
    </ListItem>
  </List>
</Collapse>


{/* Content Management Dropdown */}
<ListItem button onClick={handleContentManagementClick}>
      <ListItemIcon>
        <Event /> {/* Replace with appropriate icon */}
      </ListItemIcon>
      <ListItemText primary="Content Management" />
      {openContentManagement ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openContentManagement} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button component={Link} to="/add-educational-content" sx={{ pl: 4 }}>
          <ListItemText primary="Add Educational Content" />
        </ListItem>
        <ListItem button component={Link} to="/health-tips" sx={{ pl: 4 }}>
          <ListItemText primary="Health Tips" />
        </ListItem>
        <ListItem button component={Link} to="/upload-medical-guidelines" sx={{ pl: 4 }}>
          <ListItemText primary="Upload Medical Guidelines" />
        </ListItem>
        <ListItem button component={Link} to="/user-feedback-system" sx={{ pl: 4 }}>
          <ListItemText primary="User Feedback System" />
        </ListItem>
        <ListItem button component={Link} to="/emergency-alerts" sx={{ pl: 4 }}>
          <ListItemText primary="Emergency Alerts" />
        </ListItem>
      </List>
    </Collapse>

    {/* Logout */}
    <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
  </List>
</Drawer>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f4f6f8",
          overflow: "auto",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "white",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap color="black" textAlign="center" sx={{ flexGrow: 1 }}>
              Hospital Management System
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        {/* Overview Cards */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {stats.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  boxShadow: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 2,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {item.count}
                  </Typography>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.subtext}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Bar Chart
            </Typography>
            <Box sx={{ height: "250px", width: "100%" }}>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Doughnut Chart
            </Typography>
            <Box sx={{ height: "250px", width: "100%" }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
