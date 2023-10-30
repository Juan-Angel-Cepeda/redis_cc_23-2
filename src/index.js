const express = require('express');
const charactersRouter = require('./routes/characters');
const responseTime = require('response-time');
const app = express();

app.use(responseTime());
app.use('/characters',charactersRouter);

app.listen(3000);
console.log('Server on port',3000);

  