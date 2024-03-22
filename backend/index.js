const mongo = require('mongoose');
const express = require('express');
const app = express();
const user = require('./models/user');
const bodyParser = require('body-parser');
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect('mongodb://192.168.1.30:27017/dnotes')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


app.get('/health', (req, res) => {
    res.send('Backend is up and running...');
});

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if(!username || !password || !email) {
        return res.status(400).send('Missing required fields');
    }

    user.create({
        username: username,
        password: password,
        email: email,
        id: Math.floor(Math.random() * 1000000000000) + Date.now(),
    }).then((user) => {
        // make a folder called user.id
        fs.mkdir(`./data/${user.id}`, (err) => {
            if(err) {
                console.log(err);
                return res.status(400).send('User successfully created, but failed to create user folder. Please contact support.');
            }
        });
        res.status(200).send('User created');
    }).catch((err) => {
        console.log(err);
        res.status(400).send('User not created');
    });
});




















app.listen(3000, () => console.log('Listening on port 3000...'));