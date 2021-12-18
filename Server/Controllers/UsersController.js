const models = require('./../models');
const { createSaltedPassword, createSalt } = require('./HashFunctions');

module.exports = {
  signUp: async (req, res) => {
    const { email, password, phoneNum, userName, companyNumbers } = req.body;
    const salt = await createSalt();
    const { saltedPassword } = await createSaltedPassword(password, salt).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // 사업자 번호 유무에 따라 일반 사용자 / 사업자로 구분한다
    // 이메일이 중복되면 회원가입 거부
    if (companyNumbers === undefined) {
      const [newUser, created] = await models.User.findOrCreate({
        where: { email: email },
        defaults: {
          userName: userName,
          email: email,
          phoneNum: phoneNum,
          role: 'general',
          oauthLogin: false,
          saltedPassword: saltedPassword,
          salt: salt
        },
        raw: true
      }).catch(err => {
        return res.status(500).json({ code: 500, error: err });
      });

      if (created) {
        res.status(201).json({ code: 201, role: newUser.role });
      } else {
        res.status(409).json({ code: 409, error: 'user info already exists' });
      }
    } else {
      const [newUser, created] = await models.User.findOrCreate({
        where: { email: email },
        defaults: {
          userName: userName,
          email: email,
          phoneNum: phoneNum,
          role: 'general',
          oauthLogin: false,
          saltedPassword: saltedPassword,
          salt: salt
        },
        raw: true
      }).catch(err => {
        return res.status(500).json({ code: 500, error: err });
      });

      if (created) {
        res.status(201).json({ code: 201, role: newUser.role });
      } else {
        res.status(409).json({ code: 409, error: 'user info already exists' });
      }
    }
  }
};
