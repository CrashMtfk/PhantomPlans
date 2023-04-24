const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const hashSaltRounds = 10;

const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


// Connection with mysql database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'phantom_plans_db',
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password' //change 'password' to 'passwordField'
},
    async (usernameField, passwordField, done) => {
        try {
            db.connect();
            db.query('SELECT * FROM user WHERE user_name = ?',
                [usernameField],
                async (err, result) => {
                    if (err) {
                        console.error(err);
                        return done(err);
                    }

                    if (result.length === 0) {
                        return done(null, false, { message: 'Incorrect username or password.' });
                    }
                    const user = result[0];
                    console.log(usernameField + " " + passwordField + " after db connect 1");
                    const passwordMatch = await bcrypt.compare(passwordField, user.password);
                    if (!passwordMatch) {
                        return done(null, false, { message: 'Incorrect username or password.' });
                    }
                    return done(null, user);

                }
            );
        } catch (e) {
            console.log(e);
            return done(e);
        }
    }
));


passport.serializeUser(function (user, done) {
    done(null, String(user.id));
  });
  

passport.deserializeUser(function (id, done) {
    db.connect();
    db.query('SELECT * FROM user WHERE iduser = ?', [id], function (err, rows) {
        if (err) {
            console.log(err);
            return done(err);
        }

        if (!rows.length) {
            return done(null, false, { message: 'No user found!' });
        }

        const user = rows[0];
        return done(null, {id: user.iduser});
    });
})



app.post('/login', passport.authenticate('local'), (req, res) => {
    // this code will only execute if the user was successfully authenticated
    console.log('Is this functioning?');
    res.send('Login successful!');
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