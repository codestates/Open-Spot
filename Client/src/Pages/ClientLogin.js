import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import './../Styles/Login.css';
import socialLoginURL from './../Components/SocialLoginURL.js';

// 로그인, 회원가입 페이지 리팩토링 가능성 90% 일단 두고보기

const ClientLogin = ({ handleUserInfo }) => {
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
      url: 'https://api.open-spot.tk/auth/local',
      method: 'post',
      data: payload
    }).then((data) => {
      console.log(data); // 받아오는 response.body로 handleUserInfo 업데이트시키기

      setIsNotMatch(false);
      navigate('/');
    })
      .catch((err) => {
        console.log(err);
        handleUserInfo({ isLogin: false });
        setIsNotMatch(true);
      });
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
                className="social-icons" id="googleIcon" onClick={ () => socialLoginHandler(google) }
                type="button"
              />
              <input
                className="social-icons" id="naverIcon" onClick={ () => socialLoginHandler(naver) }
                type="button"
              />
              <input
                className="social-icons" id="kakaoIcon" onClick={ () => socialLoginHandler(kakao) }
                type="button"
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
