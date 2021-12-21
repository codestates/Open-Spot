import * as React from 'react';
import './../App.css';
import './../Styles/Map.css';

const MapGuestSideBarPin = () => {
  return (
    <div id='map-container'>
      <div id='map-sidebar'>
        <div id='map-sidebar-header'>
          <div id='map-logo' />
        </div>
        <div id='map-firstpage-guest'>
          <p id='map-firstpage-text'>지도의 핀을 클릭해보세요 !</p>
        </div>
      </div>
    </div>
  );
};

export default MapGuestSideBarPin;
