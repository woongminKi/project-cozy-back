// const createError = require('http-errors');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { ERROR_MESSAGE } = require('../utils/tokenInfo');
// const { MESSAGE } = require('../utils/tokenInfo');

// async function verifyToken(req, res, next) {
//   if (!req.body.header) {
//     // console.log('뭐가 넘어와1?', req);
//     return;
//   }
//   console.log('뭐가 넘어와2?', req);

//   const accessToken = req.body.header.accessToken;
//   const refreshToken = req.body.header.refreshToken;
//   const accessTokenExpiresIn = req.body.header.accessTokenExpiresIn;
//   const refreshTokenExpiresIn = req.body.header.refreshTokenExpiresIn;

//   try {
//     console.log('실행돼?11');
//     const accessDecode = jwt.verify(accessToken, process.env.SECRET_KEY);
//     console.log('accessDecode??', accessDecode);
//     if (accessDecode) {
//       req.user = accessDecode;
//       res.cookie = '';
//       next();
//     }
//   } catch (err) {
//     try {
//       const refreshDecode = jwt.verify(refreshToken, process.env.SECRET_KEY);
//       console.log('refreshDecode??', refreshDecode);
//       if (refreshDecode) {
//         res.cookie = refreshDecode;
//         next();
//       }
//     } catch (err) {
//       console.log('err in verifyToken', err);
//       // if (err.message === ERROR_MESSAGE.jwtMalformed) {
//       //   next(createError(403, MESSAGE.EXPIRED_TOKEN));
//       // }

//       // if (err.message === ERROR_MESSAGE.jwtExpired) {
//       //   next(createError(403, MESSAGE.MALFORMED_TOKEN));
//       // }
//     }
//   }
// }

// module.exports = verifyToken;
