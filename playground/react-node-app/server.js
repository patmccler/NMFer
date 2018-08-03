const express = require('express');
const path = require('path');

const usersRouter = require('./routes/api/users.js');
const pictureRouter = require('./routes/api/photos.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/photos',pictureRouter);

module.exports = app;
