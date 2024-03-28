require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const hpp = require('hpp');
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
// });

// if (process.env.NODE_ENV === 'production') {
//   app.use(morgan('combined'));
//   app.use(helmet({ constentSecurityPolicy: false }));
//   app.use(hpp());
// } else {
//   app.use(morgan('dev'));
// }

const index = require('./routes/index');
const health = require('./routes/health');
// const user = require('./routes/user');
// const login = require('./routes/login');
const app = express();
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

const whitelist = [
  'http://coiniseasy.xyz',
  'http://coiniseasy.xyz:3000',
  'https://coiniseasy.xyz',
  'http://localhost:3000',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
// const corsOptions = {
//   origin: process.env.COZY_CLIENT_URL,
//   credentials: true,
// };
app.use(cors(corsOptions));
app.use(express.json({ limit: 5000000 }));
app.use(express.urlencoded({ limit: 5000000, extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/index', index);
app.use('/health', health);
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
