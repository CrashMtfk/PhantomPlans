const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const hashSaltRounds = 10;

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connection with mysql database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'phantom_plans_db',
});


// Code to register a new user in the database
app.post('/create', (req, res) => {
    const { name, age, email, username, password } = req.body;
    db.query(
        'SELECT * FROM user WHERE user_name = ? OR email = ?',
        [username, email],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send('An error occurred while checking data!')
            }
            else if (result.length > 0) {
                if (result[0].user_name === username)
                    res.send("This username already exists!");
                else if (result[0].email === email)
                    res.send("This email already exists!");
            } else {
                bcrypt.hash(password, hashSaltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                        res.send('An error occurred while hashing the password!');
                    } else {
                        db.query(
                            'INSERT INTO user (name,age,email,user_name,password) VALUES (?,?,?,?,?)',
                            [name, age, email, username, hash],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send("Register success!");
                                }
                            }
                        );
                    }
                });
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});