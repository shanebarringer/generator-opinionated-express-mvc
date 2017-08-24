const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  const genError = { message: 'Oops: Something bad happened' };
  res.locals.error = process.env.NODE_ENV === 'development'
                   ? err
                   : genError;

  // render the error page
  res.status(err.status || 500);
  res.json({ message: res.locals.error.message });
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`👩‍💻  App listening at port ${app.get('port')} ‍💻`);
});
