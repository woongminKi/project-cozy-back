const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ERROR_MESSAGE } = require('../utils/tokenInfo');
const { MESSAGE } = require('../utils/tokenInfo');

async function verifyToken(req, res, next) {
  if (!req.body.header) {
    console.log('뭐가 넘어와1?', req);
    return;
  }

  const accessToken = req.body.header.accessToken;
  const refreshToken = req.body.header.refreshToken;
  const accessTokenExpiresIn = req.body.header.accessTokenExpiresIn;
  const refreshTokenExpiresIn = req.body.header.refreshTokenExpiresIn;
  const { uid, user_name } = req.body.data;
  console.log(
    '뭐가 넘어와2?',
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn
  );

  try {
    const checkUser = await User.findOne({ uid }).lean();
    console.log('checkUser', checkUser);
    if (checkUser) {
      jwt.verify(
        accessToken,
        process.env.SECRET_KEY,
        async (error, decoded) => {
          if (error) {
            const errorData = createError(401, error, {
              message: '유효하지 않은 토큰입니다. ',
            });
            next(errorData);
          }

          console.log('decoded::', decoded);
          res.cookie = decoded;
        }
      );
      return next(req.body.data);
    } else {
      const payload = { uid, user_name, expires_in: accessTokenExpiresIn };
      const jwtToken = jwt.sign(payload, process.env.SECRET_KEY);
      console.log('jwtToken', jwtToken);
      return res.json({ token: jwtToken });
    }

    // const accessDecode = jwt.verify(accessToken, process.env.SECRET_KEY);
    // console.log('accessDecode??', accessDecode);
    // if (accessDecode) {
    //   req.user = accessDecode;
    //   res.cookie = '';
    //   next();
    // }
  } catch (err) {
    console.log('err in verifyToken', err);
    // try {
    //   const refreshDecode = jwt.verify(refreshToken, process.env.SECRET_KEY);
    //   console.log('refreshDecode??', refreshDecode);
    //   if (refreshDecode) {
    //     res.cookie = refreshDecode;
    //     next();
    //   }
    // } catch (err) {
    //   console.log('err in verifyToken', err);
    //   // if (err.message === ERROR_MESSAGE.jwtMalformed) {
    //   //   next(createError(403, MESSAGE.EXPIRED_TOKEN));
    //   // }

    //   // if (err.message === ERROR_MESSAGE.jwtExpired) {
    //   //   next(createError(403, MESSAGE.MALFORMED_TOKEN));
    //   // }
    // }
  }
}

module.exports = verifyToken;
