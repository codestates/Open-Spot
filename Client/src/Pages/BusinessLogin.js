import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../Styles/Login.css';

function BusinessLogin () {
  return (
    <>
      <div className="background">
        <header>
          <Link to="/">
            <div id="logo"/>
          </Link>
        </header>
        <div className="container">
          <div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessLogin;
