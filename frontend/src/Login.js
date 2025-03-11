import React, { useState } from 'react';
import { TextField, Button, Card,IconButton,CardContent, Typography, Box, Alert, InputAdornment,Link} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios from "axios";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  const validateInputs = () => {
    let valid = true;

    if(!email){
      setEmailError("Email is required.");
      valid = false;
    }
    else if (!/\S+@S+/.test(email)){
      setEmailError("Enter a valid email.");
      valid = false;
    }
    else{
     setEmailError("");
   }



   if(!password){
    setPasswordError("Password is required");
    valid = false;
  }
  else if(password.length < 3){
    setPasswordError("Password must be at least 6 characters");
    valid = false;
  }
  else {
    setPasswordError("")
  }

  return valid;
};

 
  
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
      } 
      else if(response.data.role === "Card Marker"){
        window.location.href = "/CardMarkerDashboard"; 
      }
      else if(response.data.role === "Admin"){
        window.location.href = "/Admin"; 
      }
       } catch (err) {
      setError(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <Box className="container">
      <Card className="login-card" elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
           Log in
          </Typography>

          <h4> Welcome! to Sathmaga Attendance System </h4>
          {error && <Alert severity="error">{error}</Alert>}
          {loginMessage && <Alert severity='success'>{loginMessage}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error ={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type={showPassword ? "text": "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error ={!!emailError}
              helperText={emailError}
              InputProps = {{
                endAdornment:(
                  <InputAdornment position ="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
          <Box mt={2}>
            <Link href="/" variant="body1">
              Go to Home
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
