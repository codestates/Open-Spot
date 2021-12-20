import React from 'react';
import './../App.css';
import './../Styles/Login.css';

function Login () {
  return (
    <>
      <div className="background">
        <header>
          <div id="logo" />
        </header>
        <div className="container">
          <div>
            <p id="title">
              LOG IN
            </p>
            <div id="input-container-login">
              <input className="base-input" placeholder="이메일" />
              <input className="base-input" placeholder="비밀번호" />
              <div className="verification">
                {/* 이메일과 비밀번호가 일치하지 않습니다 -문구 띄우기 */}
              </div>
              <button className="base-button">로그인</button>
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

export default Login;
