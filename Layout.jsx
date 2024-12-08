import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import PatientDashboard from "./PatientDashboard";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PatientDashboard />
      </Box>
    </Box>
  );
};

export default Layout;
