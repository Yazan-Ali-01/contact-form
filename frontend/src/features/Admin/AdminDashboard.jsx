import React, { useEffect, useState } from 'react';
import {
  Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, TablePagination
} from '@mui/material';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { fetchSubmissions } from '../../services/adminService';
import AdminDashboardHeader from './components/AdminDashboardHeader';
import SubmissionModal from './components/SubmissionModal';
import audio from '../../assets/notifications/mixkit-correct-answer-tone-2870.mp3'
import { toast } from 'react-toastify';

const notificationSound = new Audio(audio);


const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [sortedSubmissions, setSortedSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL);

    socket.on('new-submission', (newSubmission) => {
      setSubmissions(prevSubmissions => [...prevSubmissions, newSubmission]);
      notificationSound.play()
      toast.info('New Submission Sent!')
    });

    return () => {
      socket.off('new-submission');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchSubmissions().then(data => {
      setSubmissions(data);
      setSortedSubmissions(data);  // Initialize sorted data
    });
  }, []);

  useEffect(() => {
    const sortedData = [...submissions].sort((a, b) => {
      return sortOrder === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortedSubmissions(sortedData);
  }, [submissions, sortOrder]);

  const handleSort = () => {
    setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container sx={{ padding: 4, backgroundColor: '#e6e3e3', minHeight: '100vh' }}>
        <AdminDashboardHeader />
        <Paper sx={{ width: '85%', margin: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Subject</TableCell>
                <TableCell
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
                  onClick={handleSort}
                >
                  Sent At {sortOrder === 'asc' ? '↑' : '↓'}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSubmissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((submission, index) => (
                <motion.tr
                  key={submission._id}
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  component={TableRow}
                  sx={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#f0f0f0' }}
                >
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{new Date(submission.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleView(submission)}>
                      View
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <div dir="ltr" style={{ display: "flex", width: "100%", alignItems: 'center' }}>
            <TablePagination
              component="div"
              count={submissions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 4,
                  paddingRight: 0,
                },
                '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  marginTop: 0,
                  marginBottom: 0,
                },
                '& .MuiTablePagination-actions': {
                  marginLeft: 0,
                }
              }}
            />
          </div>
        </Paper>
        {selectedSubmission && (
          <SubmissionModal
            submission={selectedSubmission}
            open={modalOpen}
            onClose={handleClose}
          />
        )}
      </Container>
    </motion.div>
  );
};

export default AdminDashboard;
