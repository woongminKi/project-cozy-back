const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
