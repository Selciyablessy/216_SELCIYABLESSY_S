import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


const Transaction = () => {
  const navigate = useNavigate();
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
      <Box sx={{ p: 3 ,
        
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{fontFamily:'Rockwell',}}>
          Transaction Details
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Recent Transactions
              </Typography>
              <Typography variant="body1" paragraph>
                09/01/2024 - Payment from Employer: Rs.2,500.00
              </Typography>
              <Typography variant="body1" paragraph>
                08/30/2024 - Grocery Store: -Rs.120.45
              </Typography>
              <Typography variant="body1" paragraph>
                08/29/2024 - Online Subscription: -Rs.15.99
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" component="h2" gutterBottom color={'red'}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/acount')}>
                  Transfer Funds
                </Button>
                <Button variant="contained" color="primary" onClick={() => navigate('/acount')}>
                  Pay Bills
                </Button>
                <Button variant="contained" color="primary" onClick={() => navigate('/dash-one')}>
              Back
            </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Transaction;
