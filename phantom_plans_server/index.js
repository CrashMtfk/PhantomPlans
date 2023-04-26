const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
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


app.get('/users', async (req,res) => {
    const allUsers = await User.find();
    return res.json(allUsers);
});

app.get('/users/:username', async (req,res) => {
    const { username } = req.params;
    const user = await User.find({username : username})
                            .then((user) => {
                                res.status(200).json(user);
                            });
    return res.status(200).json(user);
});

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

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username : username})
        .then(async (user) => {
            if(!user) res.status(401).send('Wrong username!');
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                res.status(401).send('Wrong password!');
            } else{
                const accessToken = jwt.sign({id: user.id}, 'secretKey', {expiresIn: "60s"});
                res.json({
                    id : user._id,
                    username: user.username,
                    password: user.password,
                    accessToken,
                });
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('Something wrong happend with the request!')
        });
});

const verify = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, 'secretKey', (err,user) => {
            if(err){
                res.status(403).json("Token is not valid!");
            }

            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated");
    }
}

app.delete('/users/:userId', verify, async (req,res) => {
    if(req.user.id == req.params.userId){
        console.log(req.user.id);
        await User.findByIdAndDelete(req.user.id)
            .then(deletedUser => {
                if (!deletedUser){
                    res.status(401).json('User not found!');
                } else {
                    res.status(200).json('User has been deleted!');
                }
            })
            .catch(err => res.status(401).json('Something went wrong with deletion!'));
    } else {
        res.status(403).json("Not allowed to delete");
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});