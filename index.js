require('dotenv').config();

// express, cors, dotenv
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// database set up
const db = require('./database');
db.sequelize.sync();//{ "force": true }

// server port, production mode
const SERVER_PORT = process.env.PORT || 5000;

// cors, json parser, bodyparser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routing
app.use('/api/users', require('./api/users'));
app.use('/api/tweets', require('./api/tweets'));

// start server
const server = app.listen(SERVER_PORT, () => {
  console.log('Server started at port ' + SERVER_PORT);
});

module.exports = server;