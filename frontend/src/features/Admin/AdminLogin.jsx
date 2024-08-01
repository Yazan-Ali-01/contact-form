// AdminLogin.js
import React from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '../../services/apiService'; // Adjust the path as needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from '@mui/material';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
  maxWidth: '100vw',
  margin: 0,
  padding: 0,
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
});

const StyledPaper = styled(Paper)({
  display: 'flex',
  width: '100%',
  maxWidth: '900px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  margin: '0 20px',
});

const LeftSection = styled('div')({
  flex: 1,
  padding: '40px 30px',
  backgroundColor: '#ffffff',
});

const RightSection = styled('div')({
  flex: 1,
  padding: '40px 30px',
  background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const schema = z.object({
  username: z.string().min(1, 'Username is required').max(15),
  password: z.string().min(1, 'Password is required').max(15),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: 'admin',
      password: 'password'
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post('/admin/login', data);
      if (response.data.message === 'Login successful') {
        navigate('/admin/dashboard');
        toast.success("Logged In Successfully");
      }
    } catch (error) {
      toast.error("Failed to Login");
    }
  };

  return (
    <StyledContainer disableGutters>
      <ToastContainer position="top-center" />
      <StyledPaper elevation={6}>
        <LeftSection>
          <Typography variant="h4" gutterBottom>Sign In To Admin Portal</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>
        </LeftSection>
        <RightSection className='gap-2'>
          <Typography variant="h5" gutterBottom style={{ color: 'white' }}>Bredgin FX</Typography>
          <Typography variant="body1" gutterBottom>Forex Web Design & Development</Typography>
          <img src="https://www.bridgingfx.net/assets/images/logo/logo.png" alt="Company Logo" style={{ width: '100px', marginTop: '16px' }} />
        </RightSection>
      </StyledPaper>
    </StyledContainer>
  );
}

export default AdminLogin;
