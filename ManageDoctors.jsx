import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from '@mui/material';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [editDoctorId, setEditDoctorId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
  });

  // Fetch doctors from the database
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
      alert('Failed to fetch doctors. Please try again later.');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEditClick = (doctor) => {
    setEditDoctorId(doctor._id); // Set the doctor to edit
    setFormData(doctor); // Populate the form with the selected doctor's details
  };

  const handleCancelClick = () => {
    setEditDoctorId(null); // Cancel edit mode
    setFormData({ name: '', specialization: '', email: '', phone: '' }); // Clear form data
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/update/${editDoctorId}`, formData);
      alert('Doctor updated successfully');
      setEditDoctorId(null); // Exit edit mode
      fetchDoctors(); // Refresh the list
    } catch (error) {
      console.error('Error updating doctor:', error.message);
      alert('Failed to update doctor. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/delete/${id}`);
      alert('Doctor deleted successfully');
      setDoctors(doctors.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error.message);
      alert('Failed to delete doctor. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 4,
        backgroundColor: 'transparent', // Transparent background
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: 'white', marginBottom: 4 }} // Text color set to white
      >
        Manage Doctors
      </Typography>
      <Box
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: '900px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Specialization</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#4A90E2' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                {editDoctorId === doctor._id ? (
                  <>
                    <TableCell>
                      <TextField
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="specialization"
                        value={formData.specialization}
                        onChange={(e) =>
                          setFormData({ ...formData, specialization: e.target.value })
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveClick}
                        sx={{ marginRight: 1 }}
                      >
                        Save
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        sx={{ color: '#4A90E2', textTransform: 'none', marginRight: 1 }}
                        onClick={() => handleEditClick(doctor)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        sx={{ color: 'red', textTransform: 'none' }}
                        onClick={() => handleDelete(doctor._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default ManageDoctors;
