 import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const VerificationPage = () => {
  const [code, setCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(true); // State to track verification
  const location = useLocation();
  const navigate = useNavigate();
  
  const { username, selectedContact,amount,isSignup,from } = location.state || { username: '',selectedContact: '',amount:'', isSignup: false ,from:'/dash-one'};
  console.log('Location state:', location.state);

  const handleVerification = async () => {
    try {
      
      console.log('Username:', username);
      console.log('Is Signup:', isSignup);
      console.log('From:', from);
      const response = await axios.get('http://localhost:3001/data');
      const users = response.data.flatMap(item => item.userpass || []);

      console.log('Fetched users:', users); // Debugging line

      const user = users.find(user => user.username === username);

      if (!user) {
        setError('User not found. Please sign up first.');
        return;
      }

      if (isSignup) {
        if (code.length !== 4 || !/^\d{4}$/.test(code)) {
          setError('Please enter a valid 4-digit numeric code');
          return;
        }
        if (code !== confirmCode) {
          setError('Codes do not match');
          return;
        }

        // Store the verification code during signup
        const newUser = {
          username: username,
          verificationCode: code,
        };

        // Save the new user to the database
        await axios.post('http://localhost:3002/users', newUser);

        alert('Verification successful! Please proceed to your account details.');
        navigate('/dash-one');
      } else {
        if (user.verificationCode === code) {
          alert('Verification successful! Welcome back!');
          navigate(from); // Make sure 'from' is passed correctly

        } else {
          setError('Invalid code. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error verifying code. Please try again later.');
    }
  };
  const handleCheck = async () => {
    // Logic for what happens when "Check" button is clicked
    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      setError('Please enter a valid 4-digit numeric code');
    } else {
    }
    
    try {
      const loginDetails = {
        username: username,
        verificationCode: code,
      };

      // Save the login details to login.json
      await axios.post('http://localhost:3000/userlog', loginDetails);
      alert('Login details saved successfully!');

      // Now check if the login details exist in db.json
      const response = await axios.get('http://localhost:3002/users');
      const users = response.data;

      const user = users.find(user => user.username === username && user.verificationCode === code);

      if (user) {
        alert('Verification successful!');
        setIsVerified(false); // Set verification state to true
        navigate(from||'/acdet'); // Navigate to dash-one if verification is successful
      } else {
        alert('No matching user found in the database.');
      }
    } catch (error) {
      console.error('Error saving login details:', error);
      setError('Error saving login details. Please try again.');
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCode(value);
      setError('');
    } else {
      setError('Only numbers are allowed');
    }
  };

  const handleConfirmCodeChange = (e) => {
    const value = e.target.value;
    if (isSignup && /^\d*$/.test(value) && value.length <= 4) {
      setConfirmCode(value);
      setError('');
    } else if (!isSignup) {
      setError('Confirmation code is not required for login');
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
        {isSignup ? 'Set Your 4-Digit Code' : 'Verification'}
      </Typography>

      <TextField
        fullWidth
        label="Username"
        value={username}
        margin="normal"
        disabled
      />

      <TextField
        fullWidth
        type="password"
        label="Enter 4-Digit Code"
        value={code}
        onChange={handleCodeChange}
        margin="normal"
        error={Boolean(error)}
        helperText={error}
        inputProps={{ maxLength: 4 }}
      />
      
      {isSignup && (
        <TextField
          fullWidth
          type="password"
          label="Confirm Code"
          value={confirmCode}
          onChange={handleConfirmCodeChange}
          margin="normal"
          error={Boolean(error)}
          helperText={error}
          inputProps={{ maxLength: 4 }}
        />
      )}
      {isSignup &&(
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleVerification}
        sx={{ mt: 2 }}
      >
        Confrim
      </Button>)}
      {!isSignup && (
      <Button 
        variant="outlined" 
        color="secondary" 
        fullWidth 
        onClick={handleCheck}
        sx={{ mt: 2 }}
      >
        Check
      </Button>
      )}
    </Box>
  );
};

export default VerificationPage;
