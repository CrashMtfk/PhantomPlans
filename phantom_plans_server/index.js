const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// DB Config
const db = require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Middleware to get the body parser function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

// Register handle

app.post('/register', (req, res) => {
    // Getting the new user data from the front end
    const { name, age, username, password } = req.body;
    let responseMessage;

    // Check if the fields are filled
    if (!name || !age || !username || !password) {
        responseMessage = 'Please fill in all fields';
        res.send(responseMessage);
    }
    else { // We proceed with adding the user

        // Check if there is another user already with this username
        User.findOne({ username: username }).then(user => {
            if (user) {
                responseMessage = 'There is already a user with this username!';
                res.send(responseMessage);
            }
            else if (password.length < 6) { // Check if the password's length has the minimum length
                responseMessage = 'Password should be at least 6 characters!';
                res.send(responseMessage);
            }
            else { // If there is no user with this credentials we proceed further with the registration
                const newUser = new User({
                    name,
                    age,
                    username,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save()
                        .then(user => {
                            responseMessage = 'Registered successfully';
                            res.send(responseMessage);
                        })
                        .catch(err => console.log(err));
                }));
            }
        })
    }
});

app.post('/api/login', async (req, res) => {
    const { usernameLogin, passwordLogin } = req.body;
    console.log(usernameLogin + " " + passwordLogin);
    try {
        const user = await User.findOne({ username: usernameLogin });
        if (!user) {
            res.status(401).send('User not found');
        } else {
            const isMatching = await bcrypt.compare(passwordLogin, user.password);
            if (!isMatching) {
                res.status(401).send('Incorrect password');
            } else {
                res.send(user);
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in getting user');
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});