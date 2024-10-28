
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div
style={{
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  backgroundColor:'aliceblue',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}}
>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to MyBank. We are committed to providing the best banking experience to our customers.
        Our team is dedicated to offering top-notch financial services with a focus on customer satisfaction.
        
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
        Back to Home
      </Button>
    </Box>
    </div>
  );
};

export default AboutPage;
