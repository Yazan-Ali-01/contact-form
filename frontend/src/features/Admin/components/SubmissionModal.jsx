import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const SubmissionModal = ({ submission, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          maxWidth: '90vw',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '5px',
          overflowY: 'auto',
          wordWrap: 'break-word',
        }}
      >
        <Typography variant="h6" component="h2">
          <span style={{ color: '#047857' }}>Message from</span> {submission?.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong style={{ color: '#10b981' }}>Subject:</strong> {submission?.subject}
        </Typography>
        <Typography sx={{ mt: 2, whiteSpace: 'pre-line' }}>
          <strong style={{ color: '#10b981' }}>Message:</strong> {submission?.message}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong style={{ color: '#10b981' }}>Sent at:</strong> {new Date(submission?.createdAt).toLocaleString()}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SubmissionModal;
