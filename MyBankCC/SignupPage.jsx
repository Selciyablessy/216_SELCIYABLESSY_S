// src/pages/SignupPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

const SignupPage = ({ setFormType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert('Signup successful');
    console.log('Signup successful', data);
    setFormType(null);
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
        Signup
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name"
            {...register('firstName', {
              required: 'First Name is required',
            })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
            margin="normal"
            sx={{ mb: -1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            {...register('lastName', {
              required: 'Last Name is required',
            })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
            margin="normal"
            sx={{ mb: -1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            {...register('phoneNumber', {
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone Number must be 10 digits',
              },
            })}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
            margin="normal"
          />
        </Grid>
      </Grid>
      <TextField
        fullWidth
        label="Email"
        type="email"
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
        sx={{ mt: 1 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 1 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: value => value === watch('password') || 'Passwords must match',
        })}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
        margin="normal"
        sx={{ mt: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
        Signup
      </Button>
      <Box sx={{ mt: 1, textAlign: 'center' }}>
        <Link
          href="#"
          variant="body2"
          onClick={(e) => {
            e.preventDefault();
            setFormType('login');
          }}
        >
          Already have an account? Login
        </Link>
      </Box>
    </Box>
  );
};

export default SignupPage;
