import '../MyPageStyles/AllMyPage.css';
import React from 'react';
import ClientSiderbar from '../MyPageComponents/ClientSiderbar';
import StoreInfo from '../MyPageComponents/StoreInfo';

function ClientFavoriteList () {
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
        <ClientSiderbar />
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

export default ClientFavoriteList;
