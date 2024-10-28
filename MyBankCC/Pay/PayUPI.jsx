import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayUPI = () => {
  const [upiId, setUpiId] = useState('');
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

    // Basic validation for UPI ID and amount
    const upiIdPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/; // Example pattern for UPI ID
    if (!upiIdPattern.test(upiId)) {
      setError('Please enter a valid UPI ID');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
  // Check for sufficient balance

    if (newBalance < 0) {
      setError('Insufficient balance. Please deposit funds.');
      navigate('/verification', { state: { username, isSignup: false, from: '/acdet'} });
      return;
    }

  }
    try {
      // Replace with your API endpoint for bill payments
      const response = await axios.post('http://localhost:3008/trans', {
        username,
        type: 'withdraw',
        amount: parseFloat(amount),
      });

      // Handle success response
      if (response.status === 200||response.status === 201) {
        // Update the balance in local storage only after successful transaction
        alert('Payment successful!');
      } else {
        setError('Transaction failed. Please try again.');
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
          Pay via UPI
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="UPI ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
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
            Pay
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PayUPI;
