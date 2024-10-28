import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MobileRecharge = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');


  const serviceProviders = [
    { id: 1, name: 'Provider A' },
    { id: 2, name: 'Provider B' },
    { id: 3, name: 'Provider C' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    navigate('/verification', { 
      state: { 
          username 
      } 
  });
  const storedBalance = localStorage.getItem('balance');

  // Check if the amount is greater than the available balance
  if (parseFloat(amount) > storedBalance) {
   alert('Insufficient balance. Please check your balance.');
   navigate('/verification', { state: { username, isSignup: false, from: '/acdet'} });
 }
 else{

 const newBalance = parseFloat(storedBalance) - parseFloat(amount);
 localStorage.setItem('balance', newBalance);
 }

    // Basic validation
    if (!serviceProvider) {
      setError('Please select a service provider');
      return;
    }
    if (!mobileNumber || mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      // Replace with your API endpoint for mobile recharge
      const response = await axios.post('http://localhost:3008/trans', {
        username,
        type: 'withdraw',
        amount: parseFloat(amount),
      });

      // Handle success response
      if (response.status === 200) {
        alert('Recharge successful!');
        // Optionally navigate to a confirmation page
      }
    } catch (err) {
      console.error('Error processing recharge:', err);
      setError('Error processing recharge. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage:'url()' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Mobile Recharge
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Service Provider</InputLabel>
            <Select
              value={serviceProvider}
              onChange={(e) => setServiceProvider(e.target.value)}
            >
              {serviceProviders.map((provider) => (
                <MenuItem key={provider.id} value={provider.name}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Recharge
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default MobileRecharge;
