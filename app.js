require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
const join = require('./routes/join');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const corsOptions = {
  origin: process.env.COZY_CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: 5000000 }));
app.use(express.urlencoded({ limit: 5000000, extended: false }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', index);
app.use('/', join);
app.use('/users', users);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
