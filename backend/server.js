const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  


//path.resolve()

// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// create connnection
const port = 8082;

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
    const { email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({ error: " Email and password are required" });
    }

    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], (err, results) =>{
      if(err) return res.status(500).json({error: "Database error"});

      if(results.length === 0){
        return res.status(401).json({error : "Invalid email or password"});
      }

      const user = results[0];

      bcrypt.compare(password,user.password, (err, match) => {
        if(err) return res.status(500).json({error: "Error varifying password"});

        if(!match){
          return res.status(401).json({error: "Invalid email or password"});
        }

        const token = jwt.sign({id: user.id, email: user.email}, "secretkey", {expiresIn: "1h"});
        return res.json({message: "Login Successful", token});
      });
    });
});

//server start
app.listen(port, () => {
    console.log(`listening on port ${port} `);
  });
