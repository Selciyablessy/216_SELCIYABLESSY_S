import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ContactUs = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Clear error message for the field being edited
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    let hasErrors = false;
    let newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required.';
      hasErrors = true;
    }
    if (!email) {
      newErrors.email = 'Email is required.';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
      hasErrors = true;
    }
    if (!message) {
      newErrors.message = 'Message is required.';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // If all fields are filled, show success message and navigate
    alert('Sent successfully');
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: 'aliceblue',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or need assistance, please fill out the form below and we will get back to you as soon as possible.
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name} // Apply error state
            helperText={errors.name} // Show error message below field
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email} // Apply error state
            helperText={errors.email} // Show error message below field
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            name="message"
            value={form.message}
            onChange={handleChange}
            error={!!errors.message} // Apply error state
            helperText={errors.message} // Show error message below field
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}> {/* Use flexbox for spacing */}
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ContactUs;
