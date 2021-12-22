import * as React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../Styles/Map.css';
import axios from 'axios';

const MapUserSideBarPin = (props) => {
  // fileName 추가
  const { id, storeName, address, callNum, /* tagName, */ description, createdAt, parking, booking } = props.currentMarker;

  // 마커가 추가된 뒤, 경과한 시간을 계산
  function getUpdateDate (createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    return Math.round((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  }
  // 마커의 imageName을 가지고 파일네임 확인.
  // 서버url + 확인된 파일네임 으로 img src에 값 입력
  const imageUrl = 'https://api.open-spot.tk/' + fileName;

  const updatedDate = getUpdateDate(createdAt);

  // 내 보관함에 담기 버튼
  function addMarkertoMypage () {
    axios.post('https://api.open-spot.tk/users/markers', { markerId: id }, { withCredentials: true })
      .then(response => {
        alert('추가 성공!');
      })
      .catch(err => {
        if (err.response.status === 409) {
          alert('이미 추가된 마커입니다.');
        } else if (err.response.status === 401) {
          alert('로그인해 주세요.');
        }
      });
  }
  return (
    <div id="map-background">
      <div id="map-container">
        <div id="map-sidebar">
          <div id="map-sidebar-header">
            <Link to="/">
              <div id="map-logo" />
            </Link>
            <div id="map-update-tag">{`${updatedDate}일 전`}</div>
          </div>
          <div id="map-sidebar-body-guest">
            <div id="map-content">
              <div id="map-update-desc">{description}</div>
              <img id="map-image" src={`${imageUrl}`} /> {/* 이미지링크 넣기 */}
              <div id="map-store-title">
                {storeName}
              </div>
              <div className="map-line" />
              <div id="map-text">
                {`위치: ${address}`} <br />
                {`전화: ${callNum}`} <br />
                예약: {booking === 1 ? '가능' : '불가능'} <br />
                주차: {parking === 1 ? '가능' : '불가능'}
              </div>
              <div className="map-line" />
              <button className="map-button" onClick={ () => addMarkertoMypage() }>내 목록에 담기</button>
              { props.role === 'general' ? <Link to="/client/mypage"><button className="map-button">마이페이지 이동</button></Link> : <Link to="/business/mypage"><button className="map-button">마이페이지 이동</button></Link> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapUserSideBarPin;
