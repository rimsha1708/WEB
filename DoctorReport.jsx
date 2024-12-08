import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const DoctorReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the report from the backend
  const fetchReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/doctors');
      setReport(response.data);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load the report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  // Print the report
  const handlePrint = () => {
    window.print();
  };

  // Download the report as JSON
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'doctor_report.json';
    link.click();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        padding: 4,
        backgroundColor: '#007BFF', // Page background color
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', color: 'white', marginBottom: 4 }}
      >
        Doctor Report
      </Typography>
      {loading ? (
        <Typography sx={{ color: 'white' }}>Loading report...</Typography>
      ) : error ? (
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '900px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Report for Doctors
          </Typography>
          {/* Display the report data */}
          <pre>{JSON.stringify(report, null, 2)}</pre>

          {/* Buttons for print and download */}
          <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handlePrint}>
              Print Report
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDownload}>
              Download Report
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DoctorReport;
