import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PayContactsPage = () => {
    const navigate = useNavigate();
    const [selectedContact, setSelectedContact] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');


    const contacts = [
        { id: 1, name: 'Alice Smith' },
        { id: 2, name: 'Bob Johnson' },
        { id: 3, name: 'Charlie Brown' },
        { id: 4, name: 'Daisy Miller' },
    ];
    const username = localStorage.getItem('userName');

    const handleSubmit =async(e) => {
        e.preventDefault();
        navigate('/verification', { 
            state: { 
                username 
            } 
        });
        const storedBalance = localStorage.getItem('balance');

        // Check if the amount is greater than the available balance
        if (parseFloat(amount) > storedBalance) {
         alert('Insufficient balance. Please check your balance.');
         navigate('/verification', { state: { username, isSignup: false, from: '/acdet'} });
       }
       else{
     
       const newBalance = parseFloat(storedBalance) - parseFloat(amount);
       localStorage.setItem('balance', newBalance);
       }
        try {
            // Replace with your API endpoint
            const response = await axios.post('http://localhost:3008/trans', {
              username,
              type: 'withdraw',
              amount: parseFloat(amount),
            });
            
      
            // Handle success response
            if (response.status === 200) {
              
              alert('Payment successful!');
                    }
          } catch (err) {
            console.error('Error processing payment:', err);
            setError('Error processing payment. Please try again.');
          }
     
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage:'url()'}}>
            <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    Pay Contacts
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Contact</InputLabel>
                        <Select
                            value={selectedContact}
                            onChange={(e) => setSelectedContact(e.target.value)}
                        >
                            {contacts.map((contact) => (
                                <MenuItem key={contact.id} value={contact.name}>
                                    {contact.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        Send Payment
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default PayContactsPage;
