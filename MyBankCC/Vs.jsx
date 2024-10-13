import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const Vs = () => {
  const [code, setCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerification = () => {
    // Check if the code is a valid 4-digit number
    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      setError('Please enter a valid 4-digit numeric code');
      return;
    }
    // Check if the codes match
    if (code !== confirmCode) {
      setError('Codes do not match');
      return;
    }

    alert('Verification successful! Code set.');
    navigate('/dash-one'); // Navigate to the dashboard after successful verification
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    // Allow only digits (0-9) and restrict length to 4
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCode(value);
      setError(''); // Clear error if input is valid
    } else {
      setError('Only numbers are allowed');
    }
  };

  const handleConfirmCodeChange = (e) => {
    const value = e.target.value;
    // Allow only digits (0-9) and restrict length to 4
    if (/^\d*$/.test(value) && value.length <= 4) {
      setConfirmCode(value);
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
        Set Your 4-Digit Code
      </Typography>
      <TextField
        fullWidth
        type="password" // Use text type to allow numeric input without obfuscation
        label="Enter 4-Digit Code"
        value={code}
        onChange={handleCodeChange}
        margin="normal"
        error={Boolean(error)}
        helperText={error}
        inputProps={{ maxLength: 4 }} // Restrict input length
      />
      <TextField
        fullWidth
        type="password" // Use text type to allow numeric input without obfuscation
        label="Confirm Code"
        value={confirmCode}
        onChange={handleConfirmCodeChange}
        margin="normal"
        error={Boolean(error)}
        helperText={error}
        inputProps={{ maxLength: 4 }} // Restrict input length
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleVerification}
        sx={{ mt: 2 }}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Vs;
