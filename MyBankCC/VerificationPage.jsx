// src/pages/VerificationPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const VerificationPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: '/transaction' }; // Default redirect

  const handleVerification = () => {
    if (code.length === 4 && /^\d{4}$/.test(code)) {
      alert('Verification successful!');
      navigate(from); // Navigate based on the 'from' state
    } else {
      setError('Please enter a valid 4-digit numeric code');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCode(value);
      setError(''); // Clear error if input is valid
    } else {
      setError('Only numbers are allowed');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 5px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        margin: 'auto',
        mt: 5,
      }}
    >
      <Typography variant="h6" component="div" textAlign={'center'}>
        Verification
      </Typography>
      <TextField
        fullWidth
        type="password" // Using password type for better security
        label="Enter 4-Digit Code"
        value={code}
        onChange={handleChange}
        margin="normal"
        error={Boolean(error)} // Display error state
        helperText={error} // Show error message
        inputProps={{ maxLength: 4 }} // Restrict input length
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleVerification}
        sx={{ mt: 2 }}
      >
        Verify
      </Button>
    </Box>
  );
};

export default VerificationPage;
