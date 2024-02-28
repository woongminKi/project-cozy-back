require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
// });

const index = require('./routes/index');
// const user = require('./routes/user');
// const login = require('./routes/login');
const app = express();
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

const corsOptions = {
  origin: process.env.COZY_CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: 5000000 }));
app.use(express.urlencoded({ limit: 5000000, extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', index);
// app.use('/', login);
// app.use('/user', user);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = app;
