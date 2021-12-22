import * as React from 'react';
import './../App.css';
import './../Styles/Map.css';
import { Link } from 'react-router-dom';

const MapGuestSideBarPin = (props) => {
  const { storeName, address, callNum, tagName, description, createdAt } = props.currentMarker;

  // 마커가 추가된 뒤, 경과한 시간을 계산
  function getUpdateDate (createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    return Math.round((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  const updatedDate = getUpdateDate(createdAt);
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
              <img id="map-image" src="" /> {/* 이미지링크 넣기 */}
              <div id="map-store-title">
                {storeName}
              </div>
              <div className="map-line" />
              <div id="map-text">
                {`위치: ${address}`} <br />
                {`전화: ${callNum}`} <br />
                예약: 불가능 <br />
                주차: 가능
              </div>
              <div className="map-line" />
              <button className="map-button">내 목록에 담기</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MapGuestSideBarPin;
