const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async function (req, res, next) {
  res.status(200).send('Ok Success');

  // res.sendFile(
  //   path.join(__dirname, '../../project-cozy-client/build/index.html')
  // );
});

module.exports = router;
