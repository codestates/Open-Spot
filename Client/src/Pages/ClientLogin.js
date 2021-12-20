import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import './../Styles/Login.css';

function ClientLogin ({ handleIsUser }) {
  const [loginData, setLoginData] = useState({
    email: null,
    password: null
  });

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
      console.log(data);
      handleIsUser(true);
    })
      .catch((err) => console.log(err));
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
                {/* 이메일과 비밀번호가 일치하지 않습니다 -문구 띄우기 */}
              </div>
              <button className="base-button" onClick={ () => getLogin(loginData) }>로그인</button>
            </div>
            {/* client, business 구분자 */}
            <hr />
            <div className="button-container">
              <input className="social-icons" id="googleIcon" type="button" />
              <input className="social-icons" id="naverIcon" type="button" />
              <input className="social-icons" id="kakaoIcon" type="button" />
            </div>
            {/* client, business 구분자 */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientLogin;
