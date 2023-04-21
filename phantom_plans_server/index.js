const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: 'password',
    database: 'phantom_plans_db',
});

app.post('/create', (req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        'INSERT INTO user (name,age,email,user_name,password) VALUES (?,?,?,?,?)',
        [name,age,email,username,password], 
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Listening on pot 3001");
});