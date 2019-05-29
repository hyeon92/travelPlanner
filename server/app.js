const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./DBControl/UserController');
const TravelController = require('./DBControl/TravelController');

app.use('/users', UserController);
app.use('/travels', TravelController);
module.exports = app;
