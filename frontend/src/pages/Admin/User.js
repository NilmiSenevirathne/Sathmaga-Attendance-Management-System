import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InsideNav from '../../components/Navbar/insideNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.error("Error deleting user:", err));
  };

  const handleUpdate = (id) => {
    alert(`Update user with ID: ${id}`);
  };

  const handleAddUser = () => {
    alert("Navigate to Add User form");
  };

  return (
    <>
      <InsideNav />
      <Sidebar />

      <Box display="flex">
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                User Management
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5', border: '2px solid #000000' }}>
                      {['First Name', 'Last Name', 'Email', 'NIC', 'Contact', 'Role', 'Actions'].map((header, idx) => (
                        <TableCell key={idx} sx={{ fontWeight: 'bold' }}>
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#fff' }}>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell  sx={{ border: '2px solid #000000' }}>{user.fname}</TableCell>
                        <TableCell  sx={{ border: '2px solid #000000' }}>{user.lname}</TableCell>
                        <TableCell  sx={{ border: '2px solid #000000' }}>{user.email}</TableCell>
                        <TableCell  sx={{ border: '2px solid #000000' }}>{user.NIC}</TableCell>
                        <TableCell  sx={{ border: '2px solid #000000' }}>{user.contact}</TableCell>
                        <TableCell  sx={{ border: '2px solid #000000' }}>{user.role}</TableCell>
                        <TableCell sx={{ border: '2px solid #000000' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleUpdate(user._id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(user._id)}
                            sx={{ ml: 1 }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleAddUser}>
                  Add User
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default User;
