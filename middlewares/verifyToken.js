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

  if (req.body.header.token) {
    try {
      jwt.verify(
        req.body.header.token,
        process.env.SECRET_KEY,
        async (error, decoded) => {
          if (error) {
            const errorData = createError(401, error, {
              message: '유효하지 않은 토큰입니다. ',
            });
            next(errorData);
          }
          console.log('decoded::', decoded);
          const userData = await User.findOne({ uid: decoded.uid }).lean();
          return res.json({ userData });
        }
      );
    } catch (err) {
      console.log('err in verifyToken with token', err);
    }
  } else {
    const accessToken = req.body.header.accessToken;
    const refreshToken = req.body.header.refreshToken;
    const accessTokenExpiresIn = req.body.header.accessTokenExpiresIn;
    const refreshTokenExpiresIn = req.body.header.refreshTokenExpiresIn;
    const { uid, user_name } = req.body.data;
    let payload = {
      uid,
      user_name,
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    };

    console.log(
      '뭐가 넘어와2?',
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      payload
    );

    try {
      const jwtToken = jwt.sign(payload, process.env.SECRET_KEY);
      console.log('jwtToken', jwtToken);
      res.json({ token: jwtToken });
      next();
    } catch (err) {
      console.log('err in verifyToken', err);
    }
  }
}

module.exports = verifyToken;
