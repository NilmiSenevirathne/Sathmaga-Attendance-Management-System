const express  = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller");

app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());


//create user
app.post('/addUser',(req,res) =>{
    controller.addUser(req.body, (callback) =>{
        res.send();
    });
});