import './../AllMyPage.css';
import React from 'react';
import ClientSiderbar from '../MyPageComponents/ClientSiderbar';

function ClientFavoriteList () {
  return (
    <div className="entire-box">
      <div className="intro-bg">
        <div className="header">
          <div id="logo" />
          <ul className="nav">
            <li><a href="www.naver.com">MAP</a></li>
            <li><a href="www.naver.com">MYPAGE</a></li>
            <li><a href="www.naver.com">LOGOUT</a></li>
          </ul>
        </div>
      </div>
      <div className="second-big-box">
        <ClientSiderbar />
        <div className="favorite-inner-box">
          <div className="store-info">
            <div className="store-img-box">
              <div className="store-img"></div>
            </div>
            <div className="store-name">니쿠킹 버거</div>
            <div className="store-detail-info">
              <div className="detail-info">
                <div>주소 : 서울 강서구 강서로 72-5 580번지 코드스테이츠 1층</div>
                <div>전화번호 : 010-0000-0000</div>
                <div>주차여부 : 5/20</div>
                <div>예약 여부 : 가능</div>
              </div>
              <div className="reaction-box">
                <div>💜</div>
                <div className="count">20</div>
              </div>
            </div>
          </div>
          <div className="store-info">
            <div className="store-img-box">
              <div className="store-img"></div>
            </div>
            <div className="store-name">니쿠킹 버거</div>
            <div className="store-detail-info">
              <div className="detail-info">
                <div>주소 : 서울 강서구 강서로 72-5 580번지 코드스테이츠 1층</div>
                <div>전화번호 : 010-0000-0000</div>
                <div>주차여부 : 5/20</div>
                <div>예약 여부 : 가능</div>
              </div>
              <div className="reaction-box">
                <div>💜</div>
                <div className="count">20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientFavoriteList;
