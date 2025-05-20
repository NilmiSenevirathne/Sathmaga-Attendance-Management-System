import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import axios from "axios";

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
        { withCredentials: true } // Optional if cookies/session is used
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
    <div className="container">
      <div className="loginbg">
        <h1>Welcome to Attendance System</h1>
      </div>

      <div className="loginbox">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id='email'
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id='password'
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type='submit' className="submitbtn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
