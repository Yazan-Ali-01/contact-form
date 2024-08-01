import React from 'react';
import { Typography, Button } from '@mui/material';
import { exportSubmissionsToCSV } from '../../../services/adminService';

const AdminDashboardHeader = () => {
  
  const handleExport = () => {
    exportSubmissionsToCSV();
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '85%', margin: 'auto', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ flexGrow: 1 }}>
        Admin Dashboard
      </Typography>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <img src="https://www.bridgingfx.net/assets/images/logo/logo.png" alt="Logo" style={{ maxHeight: '50px' }} />
      </div>
      <Button variant="contained" color="secondary" onClick={handleExport} style={{ flexGrow: 1, justifySelf: 'flex-end' }}>
        Export to CSV
      </Button>
    </div>
  );
};

export default AdminDashboardHeader;
