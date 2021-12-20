import * as React from 'react';
import { useEffect } from 'react';
import './../App.css';
import './../Styles/Map.css';
import MapGuestSideBar from '../Components/MapGuestSideBar.js';
import MapGuestSideBarPin from '../Components/MapGuestSideBarPin.js';

const { kakao } = window;
const bool = false;

const MapGuest = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    /* 지도에 핀 표시하는 로직 */
    // 지도 Pin HTML
    const content = '<i class="fas fa-map-marker-alt fa-3x" style="color:rgba(216, 129, 129, 0.99);"></i>';
    // 여기에 DB에 저장된 위도, 경도값 들어가면 됩니다.
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    const customOverlay = new kakao.maps.CustomOverlay({
      position,
      content
    });
    customOverlay.setMap(map);
  });
  return (
    <>
      <div id='gather-map-sidebar'>
        {bool ? <MapGuestSideBar /> : <MapGuestSideBarPin />}
        <div id="map"></div>
      </div>
    </>
  );
};

export default MapGuest;
