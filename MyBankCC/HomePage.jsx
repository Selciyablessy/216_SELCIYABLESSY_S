import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Fade,
  Link,
} from '@mui/material';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Fileb from './Fileb.png';
import { FaUser, FaSignInAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [formType, setFormType] = useState(null);
  const [isFullPage, setIsFullPage] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = (type) => {
    setFormType(type);
    setIsFullPage(true);
  };

  const handleClose = () => {
    setIsFullPage(false);
    setFormType(null);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div style={{ height: '100vh', overflowY: 'auto', fontFamily: 'Roboto, sans-serif', backgroundColor: '#f0f4f8' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#004d40', boxShadow: 'none', mb: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>CryptoCore</Typography>
          <Box sx={{ mr: 5 }}>
            <Link href="/about-us" color="#ffffff" sx={{ display: 'flex', alignItems: 'center', '&:hover': { color: '#ffcc00' } }}>
              <InfoIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>About Us</Typography>
            </Link>
          </Box>
          <Box sx={{ mr: 3 }}>
            <Link href="/contact-us" color="#ffffff" sx={{ display: 'flex', alignItems: 'center', '&:hover': { color: '#ffcc00' } }}>
              <ContactMailIcon sx={{ color: '#ffffff', transition: 'color 0.3s' }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>Contact Us</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Landing Page */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${Fileb})`,
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Fade in timeout={1000}>
          <Paper
            elevation={12}
            sx={{
              padding: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h2" sx={{ mb: 2, fontWeight: '700', fontFamily: 'Poppins', color: '#ffcc00' }}>
              Welcome to CryptoCore
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Dancing Script', fontSize: '1.5rem', color: '#ffffff' }}>
              Your trusted partner in modern banking solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen('login')}
                sx={{ borderRadius: 25, bgcolor: '#ff4081' }}
              >
                <FaSignInAlt style={{ marginRight: '8px' }} /> Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => handleOpen('signup')}
                sx={{ borderRadius: 25, borderColor: '#ffcc00', color: '#ffcc00' }}
              >
                <FaUser style={{ marginRight: '8px' }} /> Signup
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ color: '#ffcc00', fontWeight: 'bold' }}>
                Join us for exclusive offers and services!
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Box>

      {/* Scrollable Content Section */}
      <Box sx={{ padding: 2 }}>
        {/* Services Section */}
        <Box sx={{ padding: 4, backgroundColor: '#e3f2fd', borderRadius: 2, mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: '600', fontFamily: 'Poppins' }}>Our Services</Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Personal Banking', description: 'Manage your personal accounts with ease.' },
              { title: 'Business Solutions', description: 'Tailored financial solutions for your business.' },
              { title: 'Loans & Mortgages', description: 'Flexible loan options to meet your needs.' },
              { title: 'Investment Services', description: 'Grow your wealth with expert advice.' },
              { title: 'Mobile Banking', description: 'Bank on the go with our easy-to-use app.' },
              { title: 'Insurance', description: 'Protect your assets with our insurance options.' },
            ].map((service, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Typography variant="h6" fontWeight="600">{service.title}</Typography>
                  <Typography variant="body2">{service.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ padding: 4, backgroundColor: '#e3f2fd', borderRadius: 2, mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: '600', fontFamily: 'Poppins' }}>What Our Customers Say</Typography>
          <Slider {...sliderSettings}>
            {[
              { name: 'Alice Johnson', testimonial: 'MyBank has transformed my banking experience! The app is easy to use and their support is outstanding.' },
              { name: 'Bob Smith', testimonial: 'I love the budgeting tools. They help me manage my finances effectively!' },
              { name: 'Cathy Lee', testimonial: 'The rewards program is fantastic! I earn points with every purchase.' },
            ].map((item, index) => (
              <Paper key={index} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#fff', boxShadow: 3 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>"{item.testimonial}"</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>– {item.name}</Typography>
              </Paper>
            ))}
          </Slider>
        </Box>

        {/* FAQs Section */}
        <Box sx={{ padding: 4, backgroundColor: '#e3f2fd', borderRadius: 2, mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: '600', fontFamily: 'Poppins' }}>Frequently Asked Questions</Typography>
          <Grid container spacing={2}>
            {[
              { question: 'How can I open a bank account?', answer: 'You can open an account by visiting our website or any of our branches.' },
              { question: 'What documents do I need?', answer: 'You will need a valid ID and proof of address to open an account.' },
              { question: 'How do I reset my online banking password?', answer: 'Go to the login page and click on "Forgot Password" to reset it.' },
              { question: 'Is my money safe with you?', answer: 'Yes, we ensure your funds are protected with top-notch security measures.' },
            ].map((faq, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: 'left',
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="600">{faq.question}</Typography>
                  <Typography variant="body2">{faq.answer}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
                {/* Call to Action Section */}
                <Box sx={{ padding: 4, backgroundColor: '#e0e0e0', borderRadius: 2, mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: '600', fontFamily: 'Poppins' }}>Ready to Start Banking?</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen('signup')}
            sx={{ borderRadius: 25, bgcolor: '#ff4081' }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Modal for Login/Signup */}
      {isFullPage && (
        <Box sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}>
          <Paper sx={{ width: { xs: '90%', sm: '400px' }, borderRadius: 2, boxShadow: 7, position: 'relative' }}>
            {formType === 'login' && <LoginPage setFormType={setFormType} />}
            {formType === 'signup' && <SignupPage setFormType={setFormType} />}
            <Button variant="text" onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, color: 'primary.main' }}>
              X
            </Button>
          </Paper>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ backgroundColor: '#004d40', color: '#ffffff', padding: 3, mt: 4 }}>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} CryptoCore. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
          <Link href="https://facebook.com" target="_blank" color="#ffffff">
            <FaFacebook />
          </Link>
          <Link href="https://twitter.com" target="_blank" color="#ffffff">
            <FaTwitter />
          </Link>
          <Link href="https://linkedin.com" target="_blank" color="#ffffff">
            <FaLinkedin />
          </Link>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Contact us: <Link href="mailto:support@cryptocore.com" color="#ffffff">support@cryptocore.com</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
