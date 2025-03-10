import React, { useState } from 'react';
import './Login.css'
import axios from "axios";

function Login() {
  const [ email, setEmail]= useState("");
  const [ password, setPassword]= useState("");

  const [error, setError]= useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const response = await axios.post("http://localhost:8082/login", {email, password});
      console.log(response.data);
      alert("Login Successful");
     
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role)
      if (response.data.role === "teacher"){
      window.location.href = "/TeacherDashboard";
      }
      else {
        window.location.href = "/";
      }
      
    
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
