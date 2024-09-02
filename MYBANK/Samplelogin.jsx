import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid'; // Import Grid component

const Samplelogin = () => {
  const [formType, setFormType] = useState(null); // 'login' or 'signup'
  const [isForgotPassword, setIsForgotPassword] = useState(false); // To manage forgot password form visibility

  // Declare the methods from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // Reset form when formType or isForgotPassword changes
  useEffect(() => {
    if (formType || isForgotPassword) {
      reset(); // Reset form fields
    }
  }, [formType, isForgotPassword, reset]);

  const onSubmit = (data) => {
    if (isForgotPassword) {
      // Handle OTP verification
      alert('Verification successful');
      // Close both OTP form and login page
      setIsForgotPassword(false);
      setFormType(null);
    } else {
      // Handle login or signup
      const action = formType ? formType.charAt(0).toUpperCase() + formType.slice(1) : 'Verification';
      alert(`${action} successful`);
      console.log(`${action} successful`, data); // inspect
      // Close the form
      setFormType(null);
      setIsForgotPassword(false);
    }
  };

  const handleForgotPassword = () => {
    setFormType(null); // Close any open form
    setIsForgotPassword(true); // Open forgot password form
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundImage: 'url("https://completecontroller.com/wp-content/uploads/Advantages-and-benefits-of-online-banking-Complete-Controller.jpg")',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <nav
        style={{
          height: '40px',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'black',
          padding: '10px',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'space-around',
          textDecoration: 'none',
          margin: 0,
        }}
      >
        <a href="/" style={{ textDecoration: 'none', color: 'aliceblue' }}>
          <h2>MyBank</h2>
        </a>
        <a href="/" style={{ textDecoration: 'none', color: 'aliceblue' }}>
          <h2>Home</h2>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setFormType('login');
            setIsForgotPassword(false);
          }}
          style={{ textDecoration: 'underline', color: 'aliceblue' }}
        >
          <h2>Login</h2>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setFormType('signup');
            setIsForgotPassword(false);
          }}
          style={{ textDecoration: 'underline', color: 'aliceblue' }}
        >
          <h2>Signup</h2>
        </a>
      </nav>
      
      <Typography
        variant="h2"
        component="div"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'cyan',
          textAlign: 'center',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: background for better readability
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        Welcome to MyBank 
      </Typography>

      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2, // Ensure form is above the welcome message
        }}
      >
        {(formType === 'login' || formType === 'signup') && !isForgotPassword && (
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
              onClick={() => {
                setFormType(null);
                setIsForgotPassword(false);
              }}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'gray',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ mb: -1 }}>
              {formType.charAt(0).toUpperCase() + formType.slice(1)} Form
            </Typography>
            {formType === 'signup' && (
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
            )}
            {formType === 'login' && (
              <TextField
                fullWidth
                label="Username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                margin="normal"
                sx={{ mb: 1 }}
              />
            )}
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
            {formType === 'signup' && (
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
            )}
            {formType === 'login' && (
              <FormControlLabel
                control={<Checkbox {...register('rememberMe')} color="primary" />}
                label="Remember Me"
                sx={{ mt: 1, textAlign: 'left' }}
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
              {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </Button>
            <Box sx={{ mt: 1, textAlign: 'center' }}>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  setFormType(formType === 'login' ? 'signup' : 'login');
                }}
              >
                {formType === 'login'
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Login'}
              </Link>
              {formType === 'login' && (
                <Box mt={1}>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleForgotPassword();
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {isForgotPassword && (
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
            <Typography variant="h6" component="div" sx={{ mb: -1 }}>
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
        )}
      </div>
    </div>
  );
};

export default Samplelogin;
