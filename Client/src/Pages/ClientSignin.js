import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../Styles/Signin.css';

// http://open-spot-bucket-deploy.s3-website.ap-northeast-2.amazonaws.com : S3 버킷 주소

function ClientSignin () {
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
              SIGN IN
            </p>
            <div id="input-container-signin">
              <p className="sub-title">
                사용자 개인 정보
              </p>
              <input className="base-input" placeholder='닉네임'/>
              <div className="verification">
                {/* 닉네임이 중복됩니다/(통과) or 닉네임의 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <input className="base-input" placeholder='이메일'/>
              <div className="verification">
                {/* 이메일이 중복됩니다/(통과) or 이메일의 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <input className="base-input" placeholder='비밀번호'/>
              <div className="verification">
                {/* 비밀번호의 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <input className="base-input" placeholder='비밀번호 확인'/>
              <div className="verification">
                {/* 비밀번호가 일치합니다/비밀번호가 일치하지 않습니다 -문구 띄우기 */}
              </div>
              <button className="base-button business-button">회원 가입</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSignin;
