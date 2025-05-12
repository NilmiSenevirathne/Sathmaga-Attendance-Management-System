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
} from '@mui/material';

function User() {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
    .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.error("Error deleting user:", err);
      });
  };

  const handleUpdate = (id) => {
    // You can route to update page or open a modal here
    alert(`Update user with ID: ${id}`);
  };

  const handleAddUser = () => {
    // Navigate to AddUser component or show modal
    alert("Navigate to Add User form");
  };

  return (
    <>
     <InsideNav />
     <Sidebar />
    <div style={{ display: 'flex' }}>
      
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
       
        <Typography variant="h4" gutterBottom>User Management</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>NIC</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fname}</TableCell>
                  <TableCell>{user.lname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.NIC}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleUpdate(user._id)}>Update</Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)} style={{ marginLeft: '0.5rem' }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
        </Box>
      </Container>
    </div>
    </>
  );
}

export default User;
