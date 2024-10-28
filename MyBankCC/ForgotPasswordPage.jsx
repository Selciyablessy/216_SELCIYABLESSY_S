import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = ({ setIsForgotPassword }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert('Verification successful');
    setIsForgotPassword(false);
    navigate('/home'); // Navigate to the login page after verification
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        bottom:'50px',
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 5px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        position: 'relative',
        mx: 'auto', // Center horizontally
        mt: '20vh', // Center vertically with margin
      }}
    >
    
      <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: 'top', color: 'blue' }}>
        Forgot Password Verification
      </Typography>

      <TextField
        fullWidth
        label="Enter your OTP"
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Verify
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
