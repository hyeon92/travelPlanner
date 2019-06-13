const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');

const UserController = require('./DBControl/UserController');
const TravelController = require('./DBControl/TravelController');
const AreaController = require('./DBControl/AreaController');

app.use(cors());
app.use('/users', UserController);
app.use('/travels', TravelController);
app.use('/areas', AreaController);

module.exports = app;
