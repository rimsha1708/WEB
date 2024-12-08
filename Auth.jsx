import React, { useState } from "react";
import logo from "./logo.png"; // Adjust the path as per your project structure

import {
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Sign In, Sign Up, and Forgot Password
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isForgotPassword) {
        // Handle Forgot Password
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await axios.put("http://localhost:5000/api/auth/forgot-password", {
          email: formData.email,
          newPassword: formData.password,
        });
        alert("Password reset successfully. Please log in.");
        setIsForgotPassword(false);
        setFormData({ email: "", password: "", confirmPassword: "" });
      } else if (isLogin) {
        // Handle Login
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        const { role } = response.data.user;

        alert("Login successful");

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "/admin-dashboard"; // Redirect to admin dashboard
        } else {
          window.location.href = "/user-dashboard"; // Redirect to user dashboard
        }
      } else {
        // Handle Signup
        const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
        alert("Signup successful");
      }
    } catch (error) {
      console.error("Error:", error); // Log full error for debugging
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      height: "100vh",
      width: "100vw",
    }}
  >
    {/* Left Section */}
    <Box
      sx={{
        flex: 1,
        background: "linear-gradient(135deg, #6d5dfc, #42a5f5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign="center" color="#fff" maxWidth="500px"> {/* Increased maxWidth */}
        <img
          src={logo} // Use the imported logo here
          alt="Logo"
          style={{
            marginBottom: "20px",
            maxWidth: "100%",
            borderRadius: "10px",
          }}
        />
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Riza Health Care System
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem" }}> {/* Increased font size */}
          Your trusted healthcare partner.
        </Typography>
      </Box>
    </Box>
  
    {/* Right Section */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "500px", // Increased maxWidth for the Card
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          padding: "2rem", // Added padding for more spacious design
        }}
      >
        <CardContent>
          {/* Tabs */}
          {!isForgotPassword && (
            <Tabs
              value={isLogin ? 1 : 0}
              onChange={(event, newValue) => setIsLogin(newValue === 1)}
              centered
              sx={{ marginBottom: 3 }} // Increased bottom margin for better spacing
            >
              <Tab label="Sign Up" sx={{ fontSize: "1rem" }} /> {/* Larger text */}
              <Tab label="Sign In" sx={{ fontSize: "1rem" }} />
            </Tabs>
          )}
  
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {isForgotPassword ? (
              <>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }} // Increased spacing between inputs
                />
                <TextField
                  label="New Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "12px", // Increased padding
                    fontWeight: "bold",
                    fontSize: "1rem", // Larger button text
                    backgroundColor: "#6d5dfc",
                    "&:hover": { backgroundColor: "#5743f3" },
                  }}
                >
                  Reset Password
                </Button>
              </>
            ) : (
              <>
                {!isLogin && (
                  <TextField
                    label="Full Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ marginBottom: 3 }}
                  />
                )}
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 3 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "12px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#6d5dfc",
                    "&:hover": { backgroundColor: "#5743f3" },
                  }}
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </>
            )}
          </form>
  
          {/* Footer */}
          <Box textAlign="center" mt={3}>
            {!isForgotPassword && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ cursor: "pointer", fontSize: "1rem" }} // Larger text
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </Typography>
            )}
            {isForgotPassword && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ cursor: "pointer", fontSize: "1rem" }}
                onClick={() => setIsForgotPassword(false)}
              >
                Back to Login
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
  
  );
};

export default Auth;
