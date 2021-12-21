import '../MyPageStyles/AllMyPage.css';
import React from 'react';
import Siderbar from '../MyPageComponents/Siderbar';
import StoreInfo from '../MyPageComponents/StoreInfo';

function BusinessMyStore () {
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
        <div className="store-inner-box">
          <div>
            <button className="register-bt">
              <div className="change">가게 등록 하기</div>
            </button>
          </div>
          <div className="aside"></div>
          <div className="divider">
            <StoreInfo />
            <StoreInfo />
            <StoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessMyStore;
