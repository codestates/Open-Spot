const models = require('./../models');
const { createSaltedPassword, createSalt, verifyToken } = require('./HashFunctions');
const { Sequelize } = require('./../models');
const db = require('../DB');

module.exports = {
  signUp: async (req, res) => {
    const { email, password, userName, companyNumbers } = req.body;
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
          role: 'business',
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
  },
  changeUserInfo: async (req, res) => {
    // 이름, 이메일, 비밀번호를 받는다
    const { newUserName, newEmail, newPassword } = req.body;
    if (!newUserName || !newEmail || !newPassword || !req.cookies) return res.status(400).json({ code: 400, error: 'bad request' });

    const token = req.cookies.accessToken;
    // 토큰의 유효성 검사
    const decoded = await verifyToken(token, process.env.ACCESS_SECRET)
      .catch(err => {
        console.log(err);
        res.cookie('accessToken', '');
        return res.status(401).json({ code: 401, error: 'expired token' });
      });

    // id정보로 유저 조회
    const userInfo = models.User.findOne({ where: { id: decoded.id } }).catch(err => {
      console.log(err);
      return res.status(404).json({ code: 404, error: 'user not found' });
    });

    // 암호화된 비밀번호 생성
    const salt = await createSalt();
    const { saltedPassword } = await createSaltedPassword(newPassword, salt).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // 레코드 수정
    userInfo.set({
      userName: newUserName,
      email: newEmail,
      saltedPassword: saltedPassword,
      salt: salt
    });

    await userInfo.save().catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    res.status(201).json({ code: 201, message: 'modified' });
  },
  getGeneralMarkers: async (req, res) => {
    // 토큰이 없는 경우
    if (!req.cookies || !req.cookies.accessToken) {
      return res.status(401).json({ code: 401, error: 'unauthorized' });
    }

    const token = req.cookies.accessToken;
    // 토큰의 유효성 검사
    const decoded = await verifyToken(token, process.env.ACCESS_SECRET)
      .catch(err => {
        console.log(err);
        res.cookie('accessToken', '');
        return res.status(401).json({ code: 401, message: 'unauthorized' });
      });

    // Users, UsersMarkers, Markers테이블을 inner join
    const markers = await models.Marker.findAll({
      include: [
        {
          model: models.UsersMarkers,
          where: { id: Sequelize.col('UsersMarkers.markerId') },
          attributes: [],
          include: [
            {
              model: models.User,
              where: { id: decoded.id },
              attributes: []
            }
          ]
        }
      ]
    }).catch(err => {
      console.log(err);
      return res.status(500).json({ code: 500, error: err });
    });

    // const markers = await models.User.findAll({
    //   include: [
    //     {
    //       model: models.Marker
    //     }
    //   ],
    //   where: { id: Sequelize.col('Markers.userId') }
    // });

    res.status(200).json({ code: 200, markers });
  },
  getBusinessMarkers: async (req, res) => {
    // 토큰이 없는 경우
    if (!req.cookies || !req.cookies.accessToken) {
      return res.status(401).json({ code: 401, error: 'unauthorized' });
    }

    const token = req.cookies.accessToken;
    // 토큰의 유효성 검사
    const decoded = await verifyToken(token, process.env.ACCESS_SECRET)
      .catch(err => {
        console.log(err);
        res.cookie('accessToken', '');
        return res.status(401).json({ code: 401, message: 'unauthorized' });
      });

    // const markersInfo = await models.Marker.findAll({
    //   include: [
    //     {
    //       model: models.CompanyNumber,
    //       required: true,
    //       attributes: []
    //     }
    //   ],
    //   where: { '$CompanyNumber.userId$': 15 }
    // }).catch(err => {
    //   console.log(err);
    //   return res.status(500).json({ code: 500, error: err });
    // });

    // Users, Markers테이블을 join
    const queryString = 'SELECT Markers.id, storeName, address, callNum, tagName, description, latitude, longitude, Markers.createdAt, Markers.updatedAt, userId FROM Markers JOIN Users ON Markers.userId=Users.id WHERE Markers.userId=?';

    db.query(queryString, [decoded.id], (error, markers) => {
      if (error) return res.status(500).json({ code: 500, error: error });

      res.status(200).json({ code: 200, markers });
    });
  }
};
