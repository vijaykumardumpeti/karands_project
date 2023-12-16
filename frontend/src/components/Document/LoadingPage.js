import React from 'react';
import './loadingPage.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingPage() {
  return (
    <div>
    <div className="loading-overlay">
    <div className="loading-message">
    Please wait for some time until we are working on the document
    verification...
    <Box sx={{ display: 'flex',justifyContent: "center" }}>
    <CircularProgress color="success" />
  </Box>
    </div>
  </div>
    </div>
  )
}
