import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from '../../components/SideNav';
import {
  Box,
  Container,
  Typography,
  Divider,
  CircularProgress,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function Subject() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    subject_name: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setLoggedInUser(JSON.parse(userData));
    fetchSubjects();
  }, []);

  const fetchSubjects = () => {
    setLoading(true);
    axios
      .get('http://localhost:3001/subjects')
      .then((res) => {
        setSubjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching subjects:', err);
        setLoading(false);
      });
  };

  const handleDelete = (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      axios
        .delete(`http://localhost:3001/subjects/${subjectId}`)
        .then(() => fetchSubjects())
        .catch((err) => console.error(err));
    }
  };

  const handleOpenDialog = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({ subject_name: subject.subject_name });
    } else {
      setEditingSubject(null);
      setFormData({ subject_name: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.subject_name.trim()) {
      alert('Subject name is required');
      return;
    }

    if (editingSubject) {
      axios
        .put(`http://localhost:3001/subjects/${editingSubject._id}`, formData)
        .then(() => {
          fetchSubjects();
          alert('Subject updated successfully');
          setOpenDialog(false);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post('http://localhost:3001/subjects', formData)
        .then(() => {
          alert('Subject added successfully');
          fetchSubjects();
          setOpenDialog(false);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav user={loggedInUser} clearUser={() => setLoggedInUser(null)} />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Subject Management
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Subject Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject._id}>
                    <TableCell>{subject.subject_name}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenDialog(subject)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(subject._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Subject
          </Button>
        </Box>

        {/* Add / Update Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editingSubject ? 'Update Subject' : 'Add Subject'}</DialogTitle>
          <DialogContent dividers>
            <TextField
              label="Subject Name"
              name="subject_name"
              value={formData.subject_name}
              onChange={handleFormChange}
              fullWidth
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editingSubject ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Subject;
