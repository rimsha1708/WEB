import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddDoctor = ({ onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/doctors/add', formData);
      alert('Doctor added successfully!');
      if (onDoctorAdded) {
        onDoctorAdded(response.data); // Notify the parent component about the new doctor
      }
      setFormData({ name: '', specialization: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error adding doctor:', error.message);
      alert('Failed to add doctor');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Transparent background
      }}
    >
      <Box
        sx={{
          padding: 4,
          maxWidth: '400px',
          width: '100%',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: '#4A90E2' }}
        >
          Add Doctor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#0056b3',
              color: 'white',
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#003f7f',
              },
            }}
          >
            Add Doctor
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddDoctor;
