// src/pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LoginPage = ({ setFormType, setIsForgotPassword }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert('Login successful');
    console.log('Login successful', data);
    localStorage.setItem('userName', data.username); // Store username
    localStorage.setItem('balance', 1000); // Initialize balance
    setFormType(null);
    setIsForgotPassword(false);
    navigate('/verification', { state: { from: '/dash-one' } });  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 5px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => setFormType(null)}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: 'gray',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ mb: -1 }} textAlign={'center'} fontFamily={'Arial Black'} color={'blue'}>
        Login 
      </Typography>
      <TextField
        fullWidth
        label="Username"
        {...register('username', { required: 'Username is required' })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        margin="normal"
        sx={{ mt: 1 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', { required: 'Password is required' })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 1 }}
      />
      <FormControlLabel
        control={<Checkbox {...register('rememberMe')} color="primary" />}
        label="Remember Me"
        sx={{ mt: 1, textAlign: 'left' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
        Login
      </Button>
      <Box sx={{ mt: 1, textAlign: 'center' }}>
        <Link
          href="#"
          variant="body2"
          onClick={(e) => {
            e.preventDefault();
            setFormType('signup');
          }}
        >
          Don't have an account? Sign Up
        </Link>
        <Box mt={1}>
          <Link
            href="#"
            variant="body2"
            onClick={(e) => {
              alert('OTP has been sent to your mail');
              e.preventDefault();
              setIsForgotPassword(true);
            }}
          >
            Forgot Password?
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
