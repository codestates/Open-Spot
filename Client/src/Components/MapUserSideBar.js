import * as React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../Styles/Map.css';

const MapUserSideBar = ({ role }) => (
  <div id="map-container">
    <div id="map-sidebar">
      <div id="map-sidebar-header">
        <Link to="/">
          <div id="map-logo" />
        </Link>
      </div>
      <div id="map-firstpage-user">
        <div id="map-firstpage-btn">
          <p id="map-firstpage-text">지도의 핀을 클릭해보세요 !</p>
          <div className="map-line" />
          { role === 'general' ? <Link to="/client/mypage"><button className="map-button">마이페이지 이동</button></Link> : <Link to="/business/mypage"><button className="map-button">마이페이지 이동</button></Link> }
        </div>
      </div>
    </div>
  </div>
);

export default MapUserSideBar;
