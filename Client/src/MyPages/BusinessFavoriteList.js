import '../MyPageStyles/AllMyPage.css';
import React from 'react';
import Siderbar from '../MyPageComponents/Siderbar';
import StoreInfo from '../MyPageComponents/StoreInfo';

function BusinessFavoriteList () {
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
        <div className="favorite-inner-box">
          <StoreInfo />
          <StoreInfo />
          <StoreInfo />
          <StoreInfo />
          <StoreInfo />
          <StoreInfo />
          <StoreInfo />
          <StoreInfo />
        </div>
      </div>
    </div>
  );
}

export default BusinessFavoriteList;
