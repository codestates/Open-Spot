require('dotenv').config();
const { createSaltedPassword, verifyToken } = require('./HashFunctions');
const axios = require('axios');
const request = require('request-promise');
const models = require('./../models');
const jwt = require('jsonwebtoken');

module.exports = {
  GetGoogleAPI: {
    issued: (req, res) => {
      /* 일련의 과정
        구글 로그인 버튼을 누른다
        => 클라이언트에서 인가url로 이동하여 확인을 하고, 확인이 되면 authorize_code를 받아서 클라서버에 axios 요청을 한다
        => 클라에서 받은 코드를 가지고 그 외 필요한 정보들(clientID, secret, grant_type 등등)을 포함해서 token 요청을 한다
        => 우리에게 필요한 게 들어있는건 id_token이기 때문에 jwt토큰화된 id_token을 decoding 해줘서 원하는 값을 추출해낸다
        => 추출해낸 값들을 DB에 저장하고, 클라이언트에 보낼 건 보내주고 과정을 마친다
        */

      // console.log(req.body);
      axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: req.body.authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000'
      }
      ).then((resp) => {
        //   console.log(resp.data);
        const accessToken = resp.data.access_token;
        const idToken = resp.data.id_token;
        res.status(200).json({
          accessToken: accessToken,
          idToken: idToken
        });
      })
        .catch(err => {
          return err;
        });
    },
    delete: (req, res) => {
      // req에서 accessToken을 받는다는 전제 하에 코딩한다
    }
  },
  GetNaverAPI: {
    /*
    네이버는 발급인지, 갱신인지, 삭제 요청인지에 따라 달라지는 옵션 값들이 있음
    필수 client_id, client_secret, grant_type
    */

    /*
    발급
        변경 grant_type:'authorization_code'
        생성 code:'req.body.authorizationCode'
        생성 state: 'req.body.state'
    */
    issued: (req, res) => {
      const redirectURI = encodeURI('http://localhost:3000');
      const code = req.body.authorizationCode;
      const state = req.body.state;

      const apiUrl = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      process.env.NAVER_CLIENT_ID + '&client_secret=' + process.env.NAVER_CLIENT_SECRET + '&redirect_uri=' +
      redirectURI + '&code=' + code + '&state=' + state;
      //   const result = {};
      //   클라이언트에게 원래 유저 데이터를 줘야하니 장식이지만 남겨두는 것

      axios.post(apiUrl)
        .then((resp) => {
          console.log(resp.data);
          const accessToken = resp.data.access_token;
          const refreshToken = resp.data.refresh_token;

          const token = 'Bearer ' + accessToken;
          axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: { Authorization: token }
          })
            .then((res) => {
              console.log(res.data);
              /*
          res.data.response 객체로 들어오는 정보
          id 네이버에서 사용자를 식별하는 값
          profile_image 사용자 프로필 사진
          email 사용자 이메일
          name 사용자 이름
          */
            });

          res.status(200).json({
            accessToken,
            refreshToken
          });
        })
        .catch(err => {
          return err;
        });
    },

    /*
    갱신
        변경 grant_type: 'refresh_token'
        생성 refresh_token: 네이버 이용자 인증에 성공해 발급받을 때 받은 갱신 토큰
    */
    renewal: (req, res) => {

    },

    /*
    삭제
        변경 grant_type: 'delete'
        생성 access_token: '발급받은 접근 토큰으로 URL인코딩 적용된 값을 전달해줘야한다'
        생성 service_provider: 'NAVER'
    */
    delete: (req, res) => {

    }

  },
  GetKakaoAPI: {
    // 로그인, 로그아웃시 요청하는 api가 다르다.
    issued: async (req, res) => {
      const clientID = 'dca677be4251f006b061960a3063b1f4';
      const clientSecret = 'WPXSZeHmisgqHZQ9VgfBiPdyg3CSw8oe';

      const options = {
        uri: 'https://kauth.kakao.com/oauth/token',
        method: 'POST',
        form: {
          grant_type: 'authorization_code',
          client_id: clientID,
          client_secret: clientSecret,
          redirect_uri: 'http://localhost:3000',
          code: req.body.authorizationCode
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        json: true
      };
      const token = await request(options, function (error, res, body) {
        console.log(error, body);
        return res;
      });
      //   console.log(token);

      const accessToken = token.access_token;
      //   const refreshToken = token.refresh_token;
      //   console.log(`토큰의 값\n access\n${accessToken}\n refresh\n${refreshToken}\n`);

      const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(userInfo);
      // 여기서 이제 res를 통해 전달해줘야함
    },

    delete: async (req, res) => {
      // req에서 accessToken을 받는다는 전제 하에 코딩한다
    }
  },
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

    const { id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI } = userInfo;

    const { saltedPassword } = await createSaltedPassword(req.body.password, userInfo.salt).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // 쿠키의 유효 시간을 토큰의 만료 시간과 동일하게 설정
    // https 통신을 할 경우 쿠키에서 secure: true옵션 사용하기
    if (saltedPassword === userInfo.saltedPassword) {
      const accessToken = jwt.sign({ id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none' });
      res.status(200).json({ code: 200, userName: userInfo.userName, role: userInfo.role, email: userInfo.email });
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
