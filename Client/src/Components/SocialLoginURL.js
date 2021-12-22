import qs from 'qs';

const GOOGLE_CLIENT_ID = '240166666352-jrcs8avt11vl8dp0hgo60qgnhf2t9rnn.apps.googleusercontent.com';
const GOOGLE_AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_QUERY_STRING = qs.stringify({
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: 'https://d1839m99iakp36.cloudfront.net',
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline'
});

const NAVER_CLIENT_ID = 'cwNXt0ItxMlOlF3gnPSl';
const NAVER_AUTHORIZE_URI = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_QUERY_STRING = qs.stringify({
  client_id: NAVER_CLIENT_ID,
  redirect_uri: 'https://d1839m99iakp36.cloudfront.net',
  response_type: 'code',
  state: 'hello'
});

const KAKAO_CLIENT_ID = 'dca677be4251f006b061960a3063b1f4';
const KAKAO_AUTHORIZE_URI = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_QUERY_STRING = qs.stringify({
  client_id: KAKAO_CLIENT_ID,
  redirect_uri: 'https://d1839m99iakp36.cloudfront.net',
  response_type: 'code'
});

const socialLoginURL = {
  google: GOOGLE_AUTHORIZE_URI + '?' + GOOGLE_QUERY_STRING,
  naver: NAVER_AUTHORIZE_URI + '?' + NAVER_QUERY_STRING,
  kakao: KAKAO_AUTHORIZE_URI + '?' + KAKAO_QUERY_STRING
};

export default socialLoginURL;
