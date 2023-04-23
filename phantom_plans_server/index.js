const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const hashSaltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'phantom_plans_db',
});

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

app.post('/login', (req,res) => {
    const {username, password} = req.body;

    db.query('SELECT * FROM user WHERE user_name = ?',
            [username], async (err,result) => {
                if(err){
                    console.log(err);
                    res.send('Error occurred while getting data');
                } else if (result.length == 0){
                    res.send('Invalid username or password');
                } else {
                    const user = result[0];

                    const isPasswordMatch = await bcrypt.compare(password,user.password);
                    if(isPasswordMatch){
                        res.status(200).send('Login success!');
                    } else {
                        res.status(401).send('Invalid email or password');
                    }
                }
            });
});

app.listen(3001, () => {
    console.log("Listening on pot 3001");
});