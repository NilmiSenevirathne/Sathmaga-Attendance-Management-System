import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3001/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      alert("Login Successful");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login Failed");
    }
  };

  return (
  <Box
  sx={{
    position: 'relative',
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${require('../src/images/bg4.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(8px)',
      zIndex: -1,
    },
  }}
>

      <Grid
  container
  spacing={2}
  sx={{ minHeight: '100vh' }}
  justifyContent="center"
  alignItems="center"
>
  {/* Left Side (Optional: can be hidden on small screens) */}
  <Grid item xs={12} md={6}>
    <Box sx={{ color: '#fff', p: 4, textAlign: 'center' }}>
      <Typography variant="h1" color='#FFFACD' fontWeight="bold" gutterBottom>
        සත්මග අධ්‍යාපන ආයතනය
      </Typography>
      <Typography variant="h4" mt={2}>
        ගමේ දරුවන් දැනුමින් දිනවන්නට.
      </Typography>
    </Box>
  </Grid>

  {/* Right Side (Form Centered) */}
  <Grid item xs={12} md={6}>
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: '#D3D3D3',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" align="center" mb={3}>
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <Typography color="error" align="center" mt={1}>
            {error}
          </Typography>
        )}

        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>

        

        
      </form>
    </Paper>
  </Grid>
</Grid>

    </Box>
  );
}

export default Login;
