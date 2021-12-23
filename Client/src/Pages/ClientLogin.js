import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import './../Styles/Login.css';
import socialLoginURL from './../Components/SocialLoginURL.js';

// 로그인, 회원가입 페이지 리팩토링 가능성 90% 일단 두고보기

const ClientLogin = ({ handleUserInfo, handleSocialLoginBtn }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: null,
    password: null
  });
  const [isNotMatch, setIsNotMatch] = useState(false);

  const handleEmail = (event) => {
    const email = event.target.value;
    setLoginData({
      ...loginData,
      email
    });
  };

  const handlePassword = (event) => {
    const password = event.target.value;
    setLoginData({
      ...loginData,
      password
    });
  };

  const getLogin = (payload) => {
    axios({
      url: 'https://api.open-spot.tk/auth/local-general',
      method: 'post',
      data: payload,
      withCredentials: true
    }).then((res) => {
      let profile = 'https://api.open-spot.tk/profile.png';
      if (res.data.profile) {
        profile = res.data.profile;
      }
      const userInfo = {
        isLogin: true,
        role: res.data.role,
        name: res.data.userName,
        email: res.data.email,
        oauthLogin: res.data.oauthLogin,
        profile: profile
      };
      handleUserInfo(userInfo);
      setIsNotMatch(false);
      navigate('/');
    })
      .catch((err) => {
        console.log(err);
        handleUserInfo({ isLogin: false });
        setIsNotMatch(true);
      });
  };

  const getBtnName = (event) => {
    // const currSocialBtn = event.target.value;
    // const socialBtns = ['google', 'naver', 'kakao'];
    // const obj = {};
    // socialBtns.forEach((btn) => {
    //   if (btn === currSocialBtn) obj[btn] = true;
    //   else obj[btn] = false;
    // });
    // handleSocialLoginBtn(obj);
    const currSocialBtn = event.target.value;
    const socialBtns = ['google', 'naver', 'kakao'];
    const result = {};
    socialBtns.forEach((btn) => {
      if (btn === currSocialBtn) result[btn] = true;
      else result[btn] = false;
    });
    const data = JSON.stringify(result);
    window.localStorage.setItem('socialBtn', data);
  };

  const { google, naver, kakao } = socialLoginURL;

  const socialLoginHandler = (apiURL) => {
    window.location.assign(apiURL);
  };

  return (
    <>
      <div className="background">
        <header>
          <Link to="/">
            <div id="logo" />
          </Link>
        </header>
        <div className="container">
          <div id="align-center">
            <p id="title">
              LOG IN
            </p>
            <div id="input-container-login">
              <input className="base-input" onChange={ handleEmail } placeholder="이메일" />
              <input className="base-input" onChange={ handlePassword } placeholder="비밀번호" />
              <div className="verification">
                {isNotMatch ? '이메일과 비밀번호가 일치하지 않습니다' : null}
              </div>
              <button className="base-button" onClick={ () => getLogin(loginData) }>로그인</button>
            </div>
            {/* client, business 구분자 */}
            <hr />
            <div className="button-container">
              <input
                className="social-icons" id="googleIcon" onClick={ (e) => { socialLoginHandler(google); getBtnName(e); } }
                type="button" value="google"
              />
              <input
                className="social-icons" id="naverIcon" onClick={ (e) => { socialLoginHandler(naver); getBtnName(e); } }
                type="button" value="naver"
              />
              <input
                className="social-icons" id="kakaoIcon" onClick={ (e) => { socialLoginHandler(kakao); getBtnName(e); } }
                type="button" value="kakao"
              />
            </div>
            {/* client, business 구분자 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
