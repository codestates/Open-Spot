import * as React from 'react';
import './../App.css';
import './../Styles/Map.css';

const MapGuestSideBarPin = () => {
  return (
    <div id='map-background'>
      <div id='map-container'>
        <div id='map-sidebar'>
          <div id='map-sidebar-header'>
            <div id='map-logo' />
            <div id='map-update-tag'>3일 전</div>
          </div>
          <div id='map-sidebar-body-guest'>
            <div id='map-content'>
              <div id='map-update-desc'>오픈한 지 3일 된 가게입니다</div>
              <img id='map-image' src='' /> {/* 이미지링크 넣기 */}
              <div id='map-store-title'>
                Ugly Backery 어글리 베이커리
              </div>
              <div className='map-line' />
              <div id='map-text'>
                위치: 서울시 마포구 망원동 400-1 <br />
                전화: 02-338-2018 <br />
                예약: 불가능 <br />
                주차: 가능
              </div>
              <div className='map-line' />
              <button className='map-button'>내 목록에 담기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapGuestSideBarPin;
