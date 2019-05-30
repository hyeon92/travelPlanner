const express = require('express');
const app = express();
var cors = require('cors');
const db = require('./db');

const UserController = require('./DBControl/UserController');
const TravelController = require('./DBControl/TravelController');

app.use(cors());
app.use('/users', UserController);
app.use('/travels', TravelController);
module.exports = app;
