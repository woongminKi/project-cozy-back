const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');
const { MESSAGE } = require('../utils/tokenInfo');

router.get('/', function (req, res, next) {
  res.send('Here is users route');
});
router.post('/login', async function (req, res, next) {
  const accessToken = req.body.header.accessToken;
  const refreshToken = req.body.header.refreshToken;
  const accessTokenExpiresIn = req.body.header.accessTokenExpiresIn;
  const refreshTokenExpiresIn = req.body.header.refreshTokenExpiresIn;
  const { uid, user_name, user_image } = req.body.data;
  try {
    // let user = User.findOne({ uid: uid }).lean();
    // console.log('user??', user);
    // if (!user) {
    //   await User.create({
    //     uid,
    //     displayName: user_name,
    //     imgUrl: user_image,
    //     asset: {
    //       coins: [],
    //     },
    //     round: [
    //       {
    //         initialMoney: 10000000,
    //         finalMoney: 0,
    //       },
    //     ],
    //     access_token: accessToken,
    //     refresh_token: refreshToken,
    //     access_token_expires_in: accessTokenExpiresIn,
    //     refresh_token_expires_in: refreshTokenExpiresIn,
    //   });
    //   console.log('디비에서 가져오는 유저 데이터22::', user);
    // } else {
    //   user = User.findOneAndUpdate(
    //     { uid: uid },
    //     {
    //       access_token: accessToken,
    //       refresh_token: refreshToken,
    //       access_token_expires_in: accessTokenExpiresIn,
    //       refresh_token_expires_in: refreshTokenExpiresIn,
    //     }
    //   ).lean();
    //   console.log('디비에서 가져오는 유저 데이터22::', user);
    //   if (
    //     user._update.refresh_token_expires_in >
    //     user._update.access_token_expires_in
    //   ) {
    //     res
    //       .status(201)
    //       .send({
    //         result: MESSAGE.USER_JOIN_SUCCESS,
    //         access_token: accessToken,
    //       });
    //   } else {
    //     res.status(201).send({ result: MESSAGE.EXPIRED_TOKEN });
    //   }
    // }
  } catch (err) {
    console.log('로그인 도중에 에러::', err);
  }
});

module.exports = router;
