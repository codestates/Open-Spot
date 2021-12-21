import '../MyPageStyles/AllMyPage.css';
import React from 'react';
import Siderbar from '../MyPageComponents/Siderbar';

function BusinessMyPage () {
  return (
    <div className="entire-box">
      <div className="intro-bg">
        <div className="header">
          <div id="logo" />
          <ul className="nav">
            <li>MAP</li>
            <li>MYPAGE</li>
            <li>LOGOUT</li>
          </ul>
        </div>
      </div>
      <div className="second-big-box">
        <Siderbar />
        <div className="my-page-inner-box">
          <div className="client-info-box">
            <div className="client-img-box">
              <div className="client-img"></div>
            </div>
            <div className="info-box">
              <div className="name-box">
                <div className="name">
                  <div>이름</div>
                </div>
                <div className="name-area">
                  <div>
                    <input name="text-nmae" type="text"></input>
                  </div>
                </div>
              </div>
              <div className="name-box">
                <div className="name">
                  <div>E-mail</div>
                </div>
                <div className="name-area">
                  <div>
                    <input name="text-nmae" type="text"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="change-bt">
            <button className="info-change-bt">
              <div className="client-info-change">회원정보 수정</div>
            </button>
            <button className="delete-bt">
              <div className="with-drawal">회원 탈퇴</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BusinessMyPage;
