const express = require('express');
const charactersRouter = require('./routes/characters');

const app = express();

app.use('/characters',charactersRouter);
module.exports = app;