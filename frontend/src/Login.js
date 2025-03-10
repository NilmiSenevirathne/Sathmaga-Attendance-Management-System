import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, Alert } from '@mui/material';
import axios from "axios";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8082/login", { email, password });
      console.log(response.data);
      alert("Login Successful");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "teacher") {
        window.location.href = "/TeacherDashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <Box className="container">
      <Card className="login-card" elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
           Login

          </Typography>
          <h4> Welcome! to Sathmaga Attendance System </h4>
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="submit-btn"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
