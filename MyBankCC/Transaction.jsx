import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Transaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3008/trans');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

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
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Rockwell' }}>
          Transaction Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Recent Transactions
              </Typography>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <Typography variant="body1" paragraph key={index}>
                    {transaction.date} - {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: Rs.{transaction.amount}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" paragraph>
                  No transactions available.
                </Typography>
              )}
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
