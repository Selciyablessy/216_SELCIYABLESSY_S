import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'; // Import useState
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
import axios from 'axios';
import ForgotPasswordPage from './ForgotPasswordPage'; // Adjust the path as necessary

const LoginPage = ({ setFormType }) => {
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State for forgot password

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:3001/data');
      const users = response.data.flatMap(item => item.userpass || []);
      const user = users.find(user => user.username === data.username);
      
      if (!user) {
        alert('Username does not exist. Please sign up.');
        return;
      }

      if (user.password !== data.password) {
        alert('Incorrect password. Please try again.');
        return;
      }

      localStorage.setItem('userName', data.username);
      localStorage.setItem('balance', 0);
      setFormType(null);
      navigate('/verification', { state: { username: data.username, isSignup: false,from:'/dash-one' } });
      
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Box>
      {!isForgotPassword ? (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            maxWidth: '550px',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 4px 5px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          <Typography variant="h6" component="div" sx={{ mb: -1 }} textAlign={'center'} fontFamily={'Arial Black'} color={'green'}>
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
            inputProps={{ autoComplete: 'off' }} // Prevent autocomplete
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
            inputProps={{ autoComplete: 'off' }} // Prevent autocomplete
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
                  setIsForgotPassword(true); // Show the forgot password page
                }}
              >
                Forgot Password?
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <ForgotPasswordPage setIsForgotPassword={setIsForgotPassword} />
      )}
    </Box>
  );
};

export default LoginPage;
