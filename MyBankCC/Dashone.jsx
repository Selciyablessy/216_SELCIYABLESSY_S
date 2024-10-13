import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    Paper,
    TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

const Dashone = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    

    const handleLogoutClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmLogout = () => {
        setOpenDialog(false);
        navigate('/');
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Box>
            <AppBar position="fixed" sx={{ width: '100%' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search for payment..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ bgcolor: 'white', borderRadius: 1, width: '300px' }}
                    />
                </Toolbar>
            </AppBar>

            <Drawer
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{ width: '240px' }}
                variant="temporary"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem button onClick={() => navigate('/dash-one')}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/verification', { state: { from: '/acdet' } })}>
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
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>

            <Box
                component="main"
                sx={{
                    textAlign: 'center',
                    bgcolor: 'white',
                    pt: 10, // Add padding to avoid overlap with AppBar
                    position: 'relative',
                    height: '100vh', // Full height to support background image
                    overflow: 'hidden'
                }}
            >
                <Toolbar />
                <Paper
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://image.freepik.com/free-vector/banking-business-banner-finance-savings-bank-building-silhouette-city-background_48369-11853.jpg)', // Replace with your image URL
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7 // Adjust opacity to allow text to be readable
                    }}
                />

                <Typography paragraph sx={{ position: 'relative', zIndex: 1 }}>
                    Welcome to your dashboard! Here you can manage your account, view recent transactions, adjust settings, and more.
                    <br /><br /><br />
                </Typography>

                {/* Centered Icon Grid Section */}
                <Grid 
                    container 
                    spacing={4} 
                    justifyContent="center" 
                    alignItems="center" 
                    sx={{ mb: 4, position: 'relative', zIndex: 1, height: 'auto' }}
                >
                    <Grid item>
                        <IconButton  onClick={() => navigate('/scan-qr')}>
                            <QrCodeScannerIcon color='blue' fontSize="large" />
                        </IconButton>
                        <p>Scan any QR code</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/pay-contacts')}>
                            <ContactPhoneIcon fontSize="large" />
                        </IconButton>
                        <p>Pay contacts</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/pay-phone')}>
                            <PhoneIphoneIcon fontSize="large" />
                        </IconButton>
                        <p>Pay phone number</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/bank-transfer')}>
                            <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <p>Bank transfer</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/pay-upi')}>
                            <PaymentIcon fontSize="large" />
                        </IconButton>
                        <p>Pay UPI ID or number</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/self-transfer')}>
                            <TransferWithinAStationIcon fontSize="large" />
                        </IconButton>
                        <p>Self-transfer</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/pay-bills')}>
                            <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <p>Pay bills</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/mobile-recharge')}>
                            <MobileFriendlyIcon fontSize="large" />
                        </IconButton>
                        <p>Mobile recharge</p>
                    </Grid>
                </Grid>

            </Box>

            {/* Logout Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
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
