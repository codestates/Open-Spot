require('dotenv').config();
const { createSaltedPassword, verifyToken } = require('./HashFunctions');
const axios = require('axios');
const request = require('request-promise');
const models = require('./../models');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = {
  GetGoogleAPI: async (req, res) => {
    /* 일련의 과정
        구글 로그인 버튼을 누른다
        => 클라이언트에서 인가url로 이동하여 확인을 하고, 확인이 되면 authorize_code를 받아서 클라서버에 axios 요청을 한다
        => 클라에서 받은 코드를 가지고 그 외 필요한 정보들(clientID, secret, grant_type 등등)을 포함해서 token 요청을 한다
        => 우리에게 필요한 게 들어있는건 id_token이기 때문에 jwt토큰화된 id_token을 decoding 해줘서 원하는 값을 추출해낸다
        => 추출해낸 값들을 DB에 저장하고, 클라이언트에 보낼 건 보내주고 과정을 마친다
        */

    let decode = {};
    axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: req.body.authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: 'https://d1839m99iakp36.cloudfront.net'
    }
    ).then((resp) => {
      //   console.log(resp.data);
      // const accessToken = resp.data.access_token;
      const idToken = resp.data.id_token;
      decode = jwtDecode(idToken);
    })
      .catch(err => {
        return err;
      });

    const { userEmail, name, picture } = decode;

    // 하드 코딩이 되어야 하는 시점.
    // const userEmail = 'a01023329417@gmail.com';
    // const name = '양재영';
    // const picture = 'https://lh3.googleusercontent.com/a/AATXAJwhegjEnASqnjidlgyYC7xzyu4U5jdCPpfV30MT=s96-c';

    const userInfo = await models.User.findOrCreate({
      where: { userName: name, email: userEmail, oauthLogin: 1, oauthCI: null },
      defaults: {
        role: 'general'
      }
    });

    const needData = userInfo[0].dataValues;
    const { id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI } = needData;

    const accessToken = jwt.sign({ id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.status(200).json({ code: 200, userName: needData.userName, role: needData.role, email: needData.email, profile: picture, oauthLogin: 1 });
  },
  GetNaverAPI: async (req, res) => {
    const redirectURI = encodeURI('https://d1839m99iakp36.cloudfront.net');
    const code = req.body.authorizationCode;
    const state = req.body.state;

    const apiUrl = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      process.env.NAVER_CLIENT_ID + '&client_secret=' + process.env.NAVER_CLIENT_SECRET + '&redirect_uri=' +
      redirectURI + '&code=' + code + '&state=' + state;

    const acceptToken = await axios.post(apiUrl);
    const naverAccessToken = acceptToken.data.access_token;
    // const refreshToken = acceptToken.data.refresh_token;
    const token = 'Bearer ' + naverAccessToken;

    /*
      userInfo.data.response 객체로 들어오는 정보
      id 네이버에서 사용자를 식별하는 값
      profile_image 사용자 프로필 사진
      email 사용자 이메일
      name 사용자 이름
      */
    const naverInfo = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: token }
    })
      .catch(err => {
        return res.status(500).json({ code: 500, error: err });
      });
    console.log(naverInfo);

    const result = naverInfo.data.response;
    const profile = result.profile_image;
    // 여기까지가 데이터 가져오는 코드
    // 네이버는 검증을 어떻게 해야하지? userName=네이버이름, email=네이버이메일, oauthCI=id, oauthLogin:1
    const userInfo = await models.User.findOrCreate({
      where: { oauthCI: result.id },
      defaults: {
        userName: result.name,
        email: result.email,
        role: 'general',
        oauthLogin: 1
      }
    });
    const needData = userInfo[0].dataValues;
    const { id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI } = needData;

    const accessToken = jwt.sign({ id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.status(200).json({ code: 200, userName: needData.userName, role: needData.role, email: needData.email, profile: profile, oauthLogin: 1 });
  },
  GetKakaoAPI: async (req, res) => {
    const clientID = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;

    const options = {
      uri: 'https://kauth.kakao.com/oauth/token',
      method: 'POST',
      form: {
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: 'https://d1839m99iakp36.cloudfront.net',
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

    const kakaoAccessToken = token.access_token;
    //   const refreshToken = token.refresh_token;

    const kakaoInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`
      }
    });
    console.log(kakaoInfo);
    const result = kakaoInfo.data;

    // const result =
    // {
    //   id: 2038967258,
    //   connected_at: '2021-12-18T04:31:08Z',
    //   properties: {
    //     profile_image: 'http://k.kakaocdn.net/dn/crXJwu/btqUsRhQUx0/cH6CxkKCcteXkkcuRUulx1/img_640x640.jpg',
    //     thumbnail_image: 'http://k.kakaocdn.net/dn/crXJwu/btqUsRhQUx0/cH6CxkKCcteXkkcuRUulx1/img_110x110.jpg'
    //   },
    //   kakao_account: {
    //     profile_image_needs_agreement: false,
    //     has_email: true,
    //     email_needs_agreement: false,
    //     is_email_valid: true,
    //     is_email_verified: true,
    //     email: 'terrabattle@naver.com'
    //   }
    // };

    const profile = result.properties.profile_image;
    const userInfo = await models.User.findOrCreate({
      where: { oauthCI: result.id },
      defaults: {
        userName: result.kakao_account.email.split('@')[0],
        email: result.kakao_account.email,
        role: 'general',
        oauthLogin: 1
      }
    });

    const needData = userInfo[0].dataValues;
    const { id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI } = needData;

    const accessToken = jwt.sign({ id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.status(200).json({ code: 200, userName: needData.userName, role: needData.role, email: needData.email, profile: profile, oauthLogin: 1 });
  },

  localSignInGen: async (req, res) => {
    const userInfo = await models.User.findOne({
      where: { email: req.body.email }
    }).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // DB에 없는 이메일인 경우
    if (!userInfo) {
      return res.status(404).json({ code: 404, error: 'not found' });
    } else if (userInfo.role === 'business') {
      return res.status(401).json({ code: 401, error: 'unauthorized' });
    }

    const { id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI } = userInfo;

    const { saltedPassword } = await createSaltedPassword(req.body.password, userInfo.salt).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // 쿠키의 유효 시간을 토큰의 만료 시간과 동일하게 설정
    // https 통신을 할 경우 쿠키에서 secure: true옵션 사용하기
    if (saltedPassword === userInfo.saltedPassword) {
      const accessToken = jwt.sign({ id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });

      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      res.status(200).json({ code: 200, userName: userInfo.userName, role: userInfo.role, email: userInfo.email, oauthLogin: 0 });
    } else {
      res.status(401).json({ code: 401, error: 'unauthorized' });
    }
  },
  localSignInBus: async (req, res) => {
    const userInfo = await models.User.findOne({
      where: { email: req.body.email }
    }).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // DB에 없는 이메일인 경우
    if (!userInfo) {
      return res.status(404).json({ code: 404, error: 'not found' });
    } else if (userInfo.role === 'general') {
      return res.status(401).json({ code: 401, error: 'unauthorized' });
    }

    const { id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI } = userInfo;
    // req.body.password
    const { saltedPassword } = await createSaltedPassword(req.body.password, userInfo.salt).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    // 쿠키의 유효 시간을 토큰의 만료 시간과 동일하게 설정
    // https 통신을 할 경우 쿠키에서 secure: true옵션 사용하기
    if (saltedPassword === userInfo.saltedPassword) {
      const accessToken = jwt.sign({ id, userName, email, role, oauthLogin, createdAt, updatedAt, oauthCI }, process.env.ACCESS_SECRET, { expiresIn: '5h' });
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      res.status(200).json({ code: 200, userName: userInfo.userName, role: userInfo.role, email: userInfo.email, oauthLogin: 0 });
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
        res.cookie('accessToken', '', { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
        return res.status(200).json({ code: 200, message: 'expired token' });
      });

    // 쿠키에 빈 문자열 할당
    res.cookie('accessToken', '', { httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.status(200).json({ code: 200 });
  }
};
