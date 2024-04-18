const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');
const { MESSAGE } = require('../utils/tokenInfo');

router.get('/', function (req, res, next) {
  res.send('Here is users route');
});
router.post('/login', verifyToken, async function (req, res, next) {
  const accessToken = req.body.header.accessToken;
  const refreshToken = req.body.header.refreshToken;
  const accessTokenExpiresIn = req.body.header.accessTokenExpiresIn;
  const refreshTokenExpiresIn = req.body.header.refreshTokenExpiresIn;
  const { uid, user_name, user_image } = req.body.data;
  try {
    const userData = await User.findOne({ uid }).lean();
    if (userData === null) {
      await User.create({
        uid,
        displayName: user_name,
        imgUrl: user_image,
        asset: {
          coins: [],
        },
        round: [
          {
            initialMoney: 10000000,
            finalMoney: 0,
          },
        ],
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expires_in: accessTokenExpiresIn,
        refresh_token_expires_in: refreshTokenExpiresIn,
      });
      // console.log('유저 디비 생성 완료!');
    }
  } catch (err) {
    console.log('로그인 도중에 에러::', err);
  }
});

router.post('/logout', verifyToken, async function (req, res, next) {
  try {
    jwt.verify(
      req.body.header.token,
      process.env.SECRET_KEY,
      async (error, decoded) => {
        if (error) {
          const errorData = createError(401, error, {
            message: '유효하지 않은 토큰입니다. ',
          });
          res.json({ errorData });
        }

        const user = await User.findOneAndUpdate(
          { uid: decoded.uid },
          { login_yn: 'N' }
        ).lean();
        console.log('check user', user);
      }
    );
  } catch (err) {
    console.log('err in logout', err);
  }
});

module.exports = router;
