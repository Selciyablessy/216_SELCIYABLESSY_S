// src/pages/ForgotPasswordPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ForgotPasswordPage = ({ setIsForgotPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert('Verification successful');
    setIsForgotPassword(false);
  };

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
        onClick={() => setIsForgotPassword(false)}
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
        Forgot Password Verification
      </Typography>
      <TextField
        fullWidth
        type="email"
        label="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="OTP"
        {...register('otp', {
          required: 'OTP is required',
          minLength: {
            value: 6,
            message: 'OTP must be 6 digits',
          },
          maxLength: {
            value: 6,
            message: 'OTP must be 6 digits',
          },
        })}
        error={Boolean(errors.otp)}
        helperText={errors.otp?.message}
        margin="normal"
        sx={{ mt: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
        Verify
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
