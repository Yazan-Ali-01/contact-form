import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const CenteredSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f8f9fa', // Optional: background color
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default CenteredSpinner;
