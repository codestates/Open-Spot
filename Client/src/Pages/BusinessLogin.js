import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import './../Styles/Login.css';

const BusinessLogin = ({ handleUserInfo }) => {
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

  return (
    <>
      <div className="background">
        <header>
          <Link to="/">
            <div id="logo" />
          </Link>
        </header>
        <div className="container">
          <div>
            <p id="title">
              LOG IN
            </p>
            <div id="input-container-login">
              <input className="base-input" placeholder='이메일' onChange={handleEmail} />
              <input className="base-input" placeholder='비밀번호' onChange={handlePassword} />
              <div className="verification">
                {isNotMatch ? '이메일과 비밀번호가 일치하지 않습니다' : null}
              </div>
              <button className="base-button" onClick={() => getLogin(loginData)} >로그인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessLogin;
