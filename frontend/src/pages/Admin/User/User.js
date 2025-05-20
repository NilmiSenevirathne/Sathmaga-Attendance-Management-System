import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from '../../../components/SideNav';
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
  Avatar
} from '@mui/material';

function User() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    NIC: '',
    profile_pic: '',
    contact: '',
    address: '',
    role: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setLoggedInUser(JSON.parse(userData));
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('http://localhost:3001/users')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:3001/users/${userId}`)
        .then(() => fetchUsers())
        .catch((err) => console.error(err));
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        NIC: user.NIC,
        profile_pic: user.profile_pic || '',
        contact: user.contact,
        address: user.address,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        fname: '',
        lname: '',
        email: '',
        NIC: '',
        profile_pic: '',
        contact: '',
        address: '',
        role: '',
      });
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
    if (editingUser) {
      axios
        .put(`http://localhost:3001/users/${editingUser._id}`, formData)
        .then(() => {
          fetchUsers();
          setOpenDialog(false);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post('http://localhost:3001/register', formData)
        .then(() => {
          fetchUsers();
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
          User Management
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Avatar src={user.profile_pic} alt={user.fname} />
                    </TableCell>
                    <TableCell>{user.fname}</TableCell>
                    <TableCell>{user.lname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.NIC}</TableCell>
                    <TableCell>{user.contact}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenDialog(user)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(user._id)}
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
            Add User
          </Button>
        </Box>

        {/* Add / Update Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editingUser ? 'Update User' : 'Add User'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField label="First Name" name="fname" value={formData.fname} onChange={handleFormChange} fullWidth />
              <TextField label="Last Name" name="lname" value={formData.lname} onChange={handleFormChange} fullWidth />
              <TextField label="Email" name="email" value={formData.email} onChange={handleFormChange} fullWidth />
              <TextField label="NIC" name="NIC" value={formData.NIC} onChange={handleFormChange} fullWidth />
              <TextField label="Profile Pic URL" name="profile_pic" value={formData.profile_pic} onChange={handleFormChange} fullWidth />
              <TextField label="Contact" name="contact" value={formData.contact} onChange={handleFormChange} fullWidth />
              <TextField label="Address" name="address" value={formData.address} onChange={handleFormChange} fullWidth />
              <TextField label="Role" name="role" value={formData.role} onChange={handleFormChange} fullWidth helperText="Admin, Teacher, CardMarker, Student" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editingUser ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default User;
