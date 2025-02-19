const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  


//path.resolve()

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// create connnection
const port = 8081;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "sathmagadb"
  
});

//test
db.getConnection((err, connection)=> {
  if(err){
      console.error("Error connection to the database", err);
      return;
    }
  else {
    console.log("Connected to the MySQL database");
    connection.release();   
  }
})


// login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      console.log("Login failed: Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT user_id, email, role, password FROM user WHERE email = ?";
  console.log(`Executing SQL: ${sql} with email: ${email}`);

  db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
          console.log("Login failed: No user found for email", email);
          return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];
      console.log("user data from DB", user);
    
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid email or password" });
      }

      
      const token = jwt.sign(
          { id: user.user_id, email: user.email, role: user.role },
          "secretkey",
          { expiresIn: "1h" }
      );

      console.log("Response data:", {
        message: "Login Successful",
        token,
        role: user.role,  
        
    });

      return res.json({
          message: "Login Successful",
          token,
          role: user.role
        
      });
  });
});


//server start
app.listen(port, () => {
    console.log(`listening on port ${port} `);
  });
