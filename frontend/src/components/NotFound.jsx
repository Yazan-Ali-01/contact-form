// src/components/NotFound.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: 'center', padding: '50px 0' }}>
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/contact')}>
        Go to Contact Us Form
      </Button>
    </Container>
  );
};

export default NotFound;
