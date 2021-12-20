import * as React from 'react';
import './../App.css';
import './../Styles/Map.css';

const MapUserSideBar = () => {
  return (
    <div id='map-container'>
      <div id='map-sidebar'>
        <div id='map-sidebar-header'>
          <div id='map-logo' />
          {/* <i className="fas fa-times fa-3x"></i> */}{/* 지울 가능성 열려있음 */}
        </div>
        <div id='map-firstpage-user'>
          <div id='map-firstpage-btn'>
            <p id='map-firstpage-text'>지도의 핀을 클릭해보세요 !</p>
            <div className='map-line' />
            <button id='map-first-button'>마이페이지 이동</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapUserSideBar;
