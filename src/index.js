const express = require('express');
const charactersRouter = require('./routes/characters');
const responseTime = require('response-time');
const app = express();


app.use(responseTime());
app.use('/characters',charactersRouter);
//app.use('/location',locationsRouter);  
//app.use('/episode',episodesRouter);

app.listen(3000);
console.log('Server on port',3000);
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  