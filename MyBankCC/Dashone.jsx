import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
const Dashone = () => {
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);

    const handleLogoutClick = () => {
      setOpenDialog(true); // Open the logout confirmation dialog
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false); // Close the dialog without logging out
    };
  
    const handleConfirmLogout = () => {
      setOpenDialog(false);
      // Implement your logout logic here
      navigate('/');
    };

  return (
    <Box>
     
      <AppBar
        position="fixed"
        sx={{width:'1125px' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={() => navigate('/')} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width:'240px',
        }}
        variant="permanent"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button onClick={() => navigate('/dash-one')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate('/acount')}>
            <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button onClick={() => navigate('/transaction')}>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
          <ListItem button onClick={() => navigate('/settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogoutClick}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout"  />
          </ListItem>
        </List>
        <Divider /> 
      </Drawer>
      <Box
        component="main"
        sx={{
            textAlign:'center',
            bgcolor: 'white',
            marginLeft:'180px',// Adjust based on AppBar height
        }}
      >
        <Toolbar />
        <Typography paragraph >
            Welcome to your dashboard! Here you can manage your account, view recent transactions, adjust settings, and more.
        </Typography>
        {/* Add additional content or widgets here */}
      </Box>
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashone;
