const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();
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

//server start
app.listen(port, () => {
    console.log(`listening on port ${port} `);
  });
