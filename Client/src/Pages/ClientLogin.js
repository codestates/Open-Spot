import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../Styles/Login.css';

function ClientLogin () {
  return (
    <>
      <div className="background">
        <header>
          <Link to="/">
            <div id="logo"/>
          </Link>
        </header>
        <div className="container">
          <div id="align-center">
            <p id="title">
              LOG IN
            </p>
            <div id="input-container-login">
              <input className="base-input" placeholder='이메일'/>
              <input className="base-input" placeholder='비밀번호'/>
              <div className="verification">
                {/* 이메일과 비밀번호가 일치하지 않습니다 -문구 띄우기 */}
              </div>
              <button className="base-button">로그인</button>
            </div>
            {/* client, business 구분자 */}
            <hr/>
            <div className="button-container">
              <input type="button" className="social-icons" id="googleIcon"/>
              <input type="button" className="social-icons" id="naverIcon"/>
              <input type="button" className="social-icons" id="kakaoIcon"/>
            </div>
            {/* client, business 구분자 */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientLogin;
