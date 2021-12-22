import * as React from 'react';
import { useEffect, useState } from 'react';
import './../App.css';
import './../Styles/Map.css';
import MapGuestSideBar from '../Components/MapGuestSideBar.js';
import MapGuestSideBarPin from '../Components/MapGuestSideBarPin.js';
import axios from 'axios';

const { kakao } = window;

const MapGuest = () => {
  const [isClicked, setIsClicked] = useState(false);
  // const [markersData, setMarkersData] = useState();
  const [currentMarker, setCurrentMarker] = useState();

  // 마커를 표시할 위치와 title들을 가진 배열을 반환한다
  function getPositions (markerInfo) {
    return markerInfo.map(e => ({ title: e.storeName, latlng: new kakao.maps.LatLng(Number(e.latitude), Number(e.longitude)) }));
  }

  // 마커 좌표들을 가져오기 위해 한 번만 실행
  useEffect(() => {
    async function setInfo () {
      // 서버에서 주는 응답 body가 달라질 예정. 수정 필요!
      try {
        const response = await axios.get('https://api.open-spot.tk/markers');
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(37.566693551619345, 126.97861550923805),
          level: 3
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);

        /* 지도에 핀 표시하는 로직 */
        // 지도 Pin HTML
        // 마커들의 위치 정보들
        const positions = getPositions(response.data.markers);

        // customOverlay.setMap(map);
        for (let i = 0; i < positions.length; i++) {
          // 마커를 생성
          const content = document.createElement('i');
          content.className = 'fas fa-map-marker-alt fa-3x';
          content.style.cssText = 'color:rgba(216, 129, 129, 0.99)';
          content.onclick = function () {
            setCurrentMarker(response.data.markers[i]);
            setIsClicked(true);
          };

          // eslint-disable-next-line
          let customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: positions[i].latlng,
            title: positions[i].title,
            content: content,
            yAnchor: 1,
            clickable: true
          });
        }
      } catch (err) {
        console.log(err);
      };
    }
    setInfo();
  }, []);

  return (
    <>
      <div id="gather-map-sidebar">
        {isClicked ? <MapGuestSideBarPin currentMarker={ currentMarker } /> : <MapGuestSideBar /> }
        <div id="map"></div>
      </div>
    </>
  );
};

export default MapGuest;
