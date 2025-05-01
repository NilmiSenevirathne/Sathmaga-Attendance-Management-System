import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [ email, setEmail]= useState("");
  const [ password, setPassword]= useState("");
  const [error, setError]= useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const response = await axios.post("http://localhost:3001/login", {email, password});
      alert("Login Successful");
      console.log('Login Response:', response);

      navigate("/dashboard");
      
      // Store the token in local storage
      localStorage.setItem("token",response.data.token);

    }catch(err){
      setError(err.response?.data?.error || "Login Failed");
    }
  }
  return (
    <div className="container">
     <div className="loginbg">
     <h1>Welcome to Attendance System</h1>
     
     </div>

      <div className="loginbox">
        <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' placeholder="Enter your email address" value ={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <label htmlFor="password">Password</label>
                    <input type="password"  id='password' placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    {error && <p className="error">{error}</p>}
                    
                    <button type='submit' className="submitbtn">Login</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default Login
