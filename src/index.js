const express = require('express');
const charactersRouter = require('./routes/characters');

const app = express();

app.use('/characters',charactersRouter);

app.listen(3000);
console.log('Server on port',3000);

  