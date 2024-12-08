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
  Button,
} from '@mui/material';

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient reports from the API
  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports');
      setReports(response.data); // Assuming the API returns a list of reports
    } catch (err) {
      console.error('Error fetching reports:', err.message);
      setError('Failed to load reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Print a specific report
  const handlePrint = (report) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${JSON.stringify(report, null, 2)}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  // Download a specific report as JSON
  const handleDownload = (report) => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${report.patientName}_Report.json`;
    link.click();
  };

  return (
    <Box
      sx={{
        
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 4,
          fontSize: '2.5rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Patient Reports
      </Typography>
      {loading ? (
        <Typography sx={{ color: 'white', fontSize: '1.2rem' }}>
          Loading reports...
        </Typography>
      ) : error ? (
        <Typography sx={{ color: 'red', fontSize: '1.2rem' }}>
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '900px',
            padding: 3,
            backgroundColor: 'white', // White background for the content box
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#333',
                  }}
                >
                  Patient Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#333',
                  }}
                >
                  Report Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#333',
                  }}
                >
                  Diagnosis
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#333',
                  }}
                >
                  Doctor
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textAlign: 'center',
                    color: '#333',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow
                  key={report.id}
                  sx={{
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.85)' },
                  }}
                >
                  <TableCell sx={{ fontSize: '0.9rem', color: '#333' }}>
                    {report.patientName}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', color: '#333' }}>
                    {report.date}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', color: '#333' }}>
                    {report.diagnosis}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', color: '#333' }}>
                    {report.doctorName}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                      onClick={() => handlePrint(report)}
                    >
                      Print
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                      onClick={() => handleDownload(report)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default PatientReports;
