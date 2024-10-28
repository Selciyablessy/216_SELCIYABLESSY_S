import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box, Typography, Button } from '@mui/material';

const QrScanner = ({ onScan, onClose }) => {
    const [error, setError] = useState('');
    const [cameraActive, setCameraActive] = useState(true);

    // Handle successful scan
    const handleScan = (data) => {
        if (data) {
            onScan(data); // Pass scanned data to parent
        }
    };

    // Handle errors during scanning
    const handleError = (err) => {
        setError(err.message);
    };

    const handleClose = () => {
        // Stop the camera stream if active
        const videoTracks = document.querySelector('video')?.srcObject?.getTracks();
        if (videoTracks) {
            videoTracks.forEach(track => track.stop());
        }
        
        // Refresh the page
        window.location.reload();
    };

    useEffect(() => {
        // Get access to the camera when the component mounts
        const startCamera = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (err) {
                setError('Could not access camera: ' + err.message);
            }
        };

        if (cameraActive) {
            startCamera();
        }

        return () => {
            // Clean up: stop all video tracks when component unmounts
            const videoTracks = document.querySelector('video')?.srcObject?.getTracks();
            if (videoTracks) {
                videoTracks.forEach(track => track.stop());
            }
        };
    }, [cameraActive]);

    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6">Scan a QR Code</Typography>
            {cameraActive && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            )}
            {error && <Typography color="error">{error}</Typography>}
            <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
                Close
            </Button>
        </Box>
    );
};

export default QrScanner;
