import React, { useState, useEffect } from 'react';
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
    TextField,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import GetHelp from './GetHelp';
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
import axios from 'axios';
import LanguageIcon from '@mui/icons-material/Language'; 
import QrScanner from './QrScanner';
import { QRCodeCanvas } from 'qrcode.react';

const languages = [
    "Arabic", "Bengali", "Chinese", "English", "French", "German",
    "Hindi", "Italian", "Japanese", "Korean", "Portuguese", "Russian",
    "Spanish", "Turkish", "Urdu",
];

const Dashone = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [openQrScanner, setOpenQrScanner] = useState(false);
    const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState('');
    
    // Added state for rewards dialog
    const [openRewardsDialog, setOpenRewardsDialog] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data');
                const currentUser = response.data.flatMap(item => item.userpass || []).find(user => user.username === localStorage.getItem('userName'));
                if (currentUser) {
                    setUsername(currentUser.username);
                    setEmail(currentUser.email);
                    setMobile(currentUser.mobile);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogoutClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmLogout = () => {
        setOpenDialog(false);
        navigate('/home');
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleQrScan = (data) => {
        console.log('Scanned QR Code:', data);
        setOpenQrScanner(false);
    };

    const handleOpenLanguageDialog = () => {
        setOpenLanguageDialog(true);
    };

    const handleCloseLanguageDialog = () => {
        setOpenLanguageDialog(false);
    };

    const handleLanguageSelect = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleConfirmLanguageSelection = () => {
        console.log('Selected Language:', selectedLanguage);
        handleCloseLanguageDialog();
    };

    const generateInviteCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 7; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setInviteCode(code);
        setOpenInviteDialog(true);
    };

    const handleOpenQrCodeDialog = () => {
        setQrCodeValue(username); 
        setOpenQrCodeDialog(true); 
    };

    // New function to open rewards dialog
    const handleOpenRewardsDialog = () => {
        setOpenRewardsDialog(true);
    };

    return (
        <Box>
            <AppBar position="fixed" sx={{ backgroundColor: '#004d40', boxShadow: 'none', mb: 0 }}>
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
                
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                        <Typography variant="body1">{username}</Typography>
                        <Typography variant="body2" color="textSecondary">{email}</Typography>
                        <Typography variant="body2" color="textSecondary">{mobile}</Typography>
                    </Box>
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
                    <ListItem button onClick={() => navigate('/verification', { state: { username, isSignup: false, from: '/acdet' } })}>
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
                    <Divider />
                    <ListItem button onClick={handleOpenRewardsDialog}>
                        <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                        <ListItemText primary="Rewards Earned" />
                    </ListItem>
                    <ListItem button onClick={handleOpenQrCodeDialog}>
                        <ListItemIcon><QrCodeScannerIcon /></ListItemIcon>
                        <ListItemText primary="My QR Code" />
                    </ListItem>
                    <ListItem button onClick={generateInviteCode}>
                        <ListItemIcon><ContactPhoneIcon /></ListItemIcon>
                        <ListItemText primary="Invite Friends and Get Rewards" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => navigate('/help')}>
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText primary="Get Help" />
                    </ListItem>
                    <ListItem button onClick={handleOpenLanguageDialog}>
                        <ListItemIcon><LanguageIcon /></ListItemIcon>
                        <ListItemText primary="Language" />
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
                    pt: 10,
                    position: 'relative',
                    height: '100vh',
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
                        backgroundImage: 'url(https://image.freepik.com/free-vector/banking-business-banner-finance-savings-bank-building-silhouette-city-background_48369-11853.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7
                    }}
                />

                <Typography paragraph sx={{ position: 'relative', zIndex: 1 }}>
                    Welcome to your dashboard! Here you can manage your account, view recent transactions, adjust settings, and more.
                    <br /><br /><br />
                </Typography>

                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mb: 4, position: 'relative', zIndex: 1, height: 'auto' }}
                >
                    <Grid item>
                        <IconButton onClick={() => setOpenQrScanner(true)}>
                            <QrCodeScannerIcon color='blue' fontSize="large" />
                        </IconButton>
                        <p>Scan any QR code</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/paycon')}>
                            <ContactPhoneIcon fontSize="large" />
                        </IconButton>
                        <p>Pay contacts</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/paynum')}>
                            <PhoneIphoneIcon fontSize="large" />
                        </IconButton>
                        <p>Pay phone number</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/banktransfer')}>
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
                        <IconButton onClick={() => navigate('/paybills')}>
                            <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <p>Pay bills</p>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => navigate('/recharge')}>
                            <MobileFriendlyIcon fontSize="large" />
                        </IconButton>
                        <p>Mobile recharge</p>
                    </Grid>
                </Grid>
            </Box>

            {/* QR Scanner Dialog */}
            <Dialog open={openQrScanner} onClose={() => setOpenQrScanner(false)} fullWidth maxWidth="sm">
                <QrScanner onScan={handleQrScan} onClose={() => setOpenQrScanner(false)} />
            </Dialog>

            {/* Logout Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{color:'red'}}>Confirm Logout</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to log out?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmLogout} color="primary">Logout</Button>
                </DialogActions>
            </Dialog>

            {/* Language Selection Dialog */}
            <Dialog
                open={openLanguageDialog}
                onClose={handleCloseLanguageDialog}
                PaperProps={{
                    style: {
                        minWidth: '400px',
                        maxWidth: '600px',
                    },
                }}
            >
                <DialogTitle>Select Language</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <RadioGroup value={selectedLanguage} onChange={handleLanguageSelect}>
                            {languages.map((language, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={language}
                                    control={<Radio />}
                                    label={language}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLanguageDialog} color="primary">Cancel</Button>
                    <Button
                        onClick={handleConfirmLanguageSelection}
                        color="primary"
                        disabled={!selectedLanguage}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Invite Code Dialog */}
            <Dialog open={openInviteDialog} onClose={() => setOpenInviteDialog(false)}>
                <DialogTitle>Your Invite Code</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Share this code with your friends: <strong>{inviteCode}</strong></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenInviteDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* QR Code Dialog */}
            <Dialog open={openQrCodeDialog} onClose={() => setOpenQrCodeDialog(false)}>
                <DialogTitle>Your QR Code</DialogTitle>
                <DialogContent>
                    <Box display="flex" justifyContent="center">
                        <QRCodeCanvas value={qrCodeValue} size={256} />
                    </Box>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Scan this QR code to access your details!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenQrCodeDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Rewards Dialog */}
            <Dialog open={openRewardsDialog} onClose={() => setOpenRewardsDialog(false)}>
                <DialogTitle>Rewards Earned</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">You have <strong>0</strong> rewards.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRewardsDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Dashone;
