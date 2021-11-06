require('dotenv');

const express = require('express');
const cors = require('helmet');
const helmet = require('helmet');

const server = express();
const users = require('./users/model')

server.use(express.json());
server.use(cors());
server.use(helmet())

server.use('*', (req, res, next) => {
    res.json({
        message: 'the server is running'
    })
});

server.listen(process.env.PORT, () => {
    console.log('listening on port 5000')
});

server.get('/api/users', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
});

server.post('/api/register', (req, res) => {
    users.insert(req.params.name, req.params.bio)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Please provide name and bio for the user" })
        })
});

server.post('/api/login', (req, res) => {
    users.insert(req.params.name, req.params.bio)
        .then(user => {
            res.status(201).json({
                message: "Welcome to the app."
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Please provide name and bio for the user" })
        })
});
