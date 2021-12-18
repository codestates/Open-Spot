require('dotenv').config();
const { createSaltedPassword, verifyToken } = require('./HashFunctions');
const models = require('./../models');
const jwt = require('jsonwebtoken');

module.exports = {
  localSignIn: async (req, res) => {
    const userInfo = await models.User.findOne({
      where: { email: req.body.email }
    }).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // DB에 없는 이메일인 경우
    if (!userInfo) {
      return res.status(404).json({ code: 404, error: 'not found' });
    }

    const { userName, email, phoneNum, role, oauthLogin, createdAt, updatedAt, oauthCI } = userInfo;

    const { saltedPassword } = await createSaltedPassword(req.body.password, userInfo.salt).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // 쿠키의 유효 시간을 토큰의 만료 시간과 동일하게 설정
    // https 통신을 할 경우 쿠키에서 secure: ture옵션 사용하기
    if (saltedPassword === userInfo.saltedPassword) {
      const accessToken = jwt.sign({ userName, email, phoneNum, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none' });
      res.status(200).json({ code: 200, role: userInfo.role });
    } else {
      res.status(401).json({ code: 401, error: 'unauthorized' });
    }
  },
  logout: (req, res) => {
    // ms 단위 시간
    // const now = Math.floor(Date.now() / 1000);

    // 토큰이 없는 경우
    if (!req.cookies || !req.cookies.accessToken) {
      return res.status(401).json({ code: 401, error: 'unauthorized' });
    }

    const token = req.cookies.accessToken;
    // 토큰의 유효성 검사
    verifyToken(token, process.env.ACCESS_SECRET)
      .catch(err => {
        console.log(err);
        res.cookie('accessToken', '');
        return res.status(200).json({ code: 200, message: 'expired token' });
      });

    // 쿠키에 빈 문자열 할당
    res.cookie('accessToken', '');
    res.status(200).json({ code: 200 });
  }
};
