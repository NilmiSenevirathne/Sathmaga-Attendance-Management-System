import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className="container">
     <div className="loginbg">
     <h1>Welcome to Attendance System</h1>
     
     </div>

      <div className="loginbox">
        <h2>Login</h2>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' placeholder="Enter your email address"/>

                    <label htmlFor="password">Password</label>
                    <input type="password"  id='password' placeholder="Enter your Password"/>
                    
                    <button type='submit' className="submitbtn">Login</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default Login
