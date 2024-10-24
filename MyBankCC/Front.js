import React from 'react';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JustbankImage from './Justbank.png';
import Logo from './Logo.png';
import Qoute from './Qoute.png';
import { motion } from 'framer-motion';
import { FaWallet, FaShieldAlt, FaUsers } from 'react-icons/fa';

const Front = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <div
        style={{
          flex: 1,
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          position: 'relative',
        }}
      >
         <img 
          src={Qoute} 
          alt="Just Bank" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
        <img 
          src={Logo} 
          alt="Logo" 
          style={{ 
            position: 'absolute', 
            top: '0px', 
            left: '0px', 
            width: '150px', // Adjust size as needed
            height: 'auto' 
          }} 
        />
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: '#4A90E2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <motion.img 
          src={JustbankImage} 
          alt="Just Bank" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            filter: 'blur(5px)', 
            zIndex: 1,
          }} 
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
            Your Bank, Your Future
          </Typography>
          <Box
            sx={{
              position: 'relative',
              width: '80%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              marginTop: '20px',
              zIndex: 2,
            }}
          >
            <Typography variant="h5">Welcome to MyBank</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              Your one-stop solution for all banking needs.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/home')}
                sx={{ width: '100%' }}
              >
                Proceed
              </Button>
            </motion.div>
          </Box>

          {/* Additional Decorative Elements */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 4 }}>
            {[
              { icon: <FaWallet size={40} />, title: 'Easy Payments', description: 'Quick and secure transactions.' },
              { icon: <FaShieldAlt size={40} />, title: 'Secure Banking', description: 'Your data is always protected.' },
              { icon: <FaUsers size={40} />, title: 'Community Support', description: 'Join a thriving community.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '10px',
                  padding: '10px',
                  width: '30%',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                }}
              >
                {item.icon}
                <Typography variant="h6" sx={{ mt: 1 }}>{item.title}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '4px',
                    width: '50%',
                    backgroundColor: '#ffcc00',
                    borderRadius: '5px',
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </div>
    </div>
  );
};

export default Front;
