import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PayByPhoneNumber = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
    // Retrieve the username from localStorage

  const username = localStorage.getItem('userName');
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
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      // Replace with your API endpoint
      const response = await axios.post('http://localhost:3008/trans', {
        username,
        type: 'withdraw',
        amount: parseFloat(amount),
      });
      

      // Handle success response
      if (response.status === 200) {
        
        alert('Payment successful!');
              }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Error processing payment. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage:'url()' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Pay by Phone Number
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
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
            Send Payment
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PayByPhoneNumber;
