import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SelfTransfer = () => {
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

    // Basic validation for account number and amount
    if (!accountNumber) {
      setError('Please enter your account number');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      // Replace with your API endpoint for self-transfer
      const response = await axios.post('http://localhost:3008/trans', {
        username,
        type: 'withdraw',
        amount: parseFloat(amount),
      });

      // Handle success response
      if (response.status === 200) {
        alert('Transfer successful!');
        // You can navigate to a confirmation page if needed
      }
    } catch (err) {
      console.error('Error processing transfer:', err);
      setError('Error processing transfer. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage:'url()' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Self Transfer
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Transfer
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SelfTransfer;
