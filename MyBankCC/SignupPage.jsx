import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

const TermsModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TermsContent = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  padding: theme.spacing(4),
  borderRadius: '8px',
  boxShadow: theme.shadows[5],
  maxWidth: '600px',
  width: '100%',
}));

const SignupPage = ({ setFormType }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const navigate = useNavigate();

  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  const onSubmit = async (data) => {
    if (!acceptTerms) {
      alert('You must accept the terms and conditions to sign up.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/data');
      const existingUsers = response.data.flatMap(item => item.userpass || []);
      const userExists = existingUsers.some(user => user.username === data.username);

      if (userExists) {
        alert('Username already exists. Please choose a different username.');
        return;
      }

      const newUser = { 
        username: data.username, 
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };

      existingUsers.push(newUser);
      await axios.post('http://localhost:3001/data', { userpass: existingUsers });

      alert('Signup successful! Please proceed to verification.');
      localStorage.setItem('userName', data.username);
      localStorage.setItem('balance', 0);
      setFormType(null);
      navigate('/verification', { state: { username: data.username, isSignup: true ,from:'/dash-one'} });

    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed. Please try again. Make sure the server is running and accessible.');
    }
  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '650px',
        maxHeight: '80vh', // Set a max height for the form
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 5px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        position: 'relative',
        overflowY: 'auto', // Enable vertical scrolling
      }}
    >
      <Typography variant="h6" textAlign={'center'} fontFamily={'Arial Black'} color={'green'}>
        Signup
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            {...register('username', { required: 'Username is required' })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            {...register('phoneNumber', { 
              required: 'Phone Number is required', 
              pattern: { value: /^[0-9]{10}$/, message: 'Phone Number must be 10 digits' } 
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
        {...register('email', { required: 'Email is required' })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', { required: 'Password is required' })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        {...register('confirmPassword', { 
          required: 'Please confirm your password', 
          validate: value => value === watch('password') || 'Passwords must match' 
        })}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
        margin="normal"
      />
      
      <FormControlLabel
        control={
          <Checkbox 
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            color="primary"
          />
        }
        label={
          <>
            Accept <Link onClick={handleOpenTerms} sx={{ cursor: 'pointer' }}>Terms and Conditions</Link>
          </>
        }
        sx={{ mt: 2 }}
      />

      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 1 }} 
        disabled={!acceptTerms}
      >
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

      <TermsModal
        open={openTerms}
        onClose={handleCloseTerms}
      >
        <TermsContent>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="body2" paragraph>
            Please read these terms and conditions carefully before using our service.
          </Typography>
          <Typography variant="body2" paragraph>
            1. You agree to provide accurate information when signing up for our services.
          </Typography>
          <Typography variant="body2" paragraph>
            2. You are responsible for maintaining the confidentiality of your account.
          </Typography>
          <Typography variant="body2" paragraph>
            3. We reserve the right to modify or terminate our services at any time.
          </Typography>
          <Typography variant="body2" paragraph>
            4. You agree to comply with all applicable laws and regulations.
          </Typography>
          <Typography variant="body2" paragraph>
            5. By using our services, you agree to these terms and conditions.
          </Typography>
          <Button variant="contained" onClick={handleCloseTerms} sx={{ mt: 2 }}>
            Close
          </Button>
        </TermsContent>
      </TermsModal>
    </Box>
  );
};

export default SignupPage;
