import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayBills = () => {
  const [billType, setBillType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
    if (!billType) {
      setError('Please select a bill type');
      return;
    }
    if (!accountNumber) {
      setError('Please enter your account number');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      // Replace with your API endpoint for bill payments
      const response = await axios.post('http://localhost:3008/trans', {
        username,
        type: 'withdraw',
        amount: parseFloat(amount),
      });

      // Log the request and response for debugging
      console.log('Request data:', { billType, accountNumber, amount });
      console.log('Payment response:', response);

      // Handle success response
      if (response.status === 200 || response.status === 201) {
        alert('Bill payment successful!');
      
      } else {
        setError('Payment failed. Please try again.'); // Handle unexpected response statuses
      }
    } catch (err) {
      console.error('Error processing bill payment:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display specific server error message
      } else {
        setError('Error processing bill payment. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage:'url()' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Pay Bills
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Bill Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
            required
          />
          <TextField
            label="Account Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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
            Pay Bill
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PayBills;
