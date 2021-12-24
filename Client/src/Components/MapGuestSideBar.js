import * as React from 'react';
import { Link } from 'react-router-dom';

import './../App.css';
import './../Styles/Map.css';

const MapGuestSideBarPin = () => (
  <div id="map-container">
    <div id="map-sidebar">
      <div id="map-sidebar-header">
        <Link to="/">
          <div id="map-logo" />
        </Link>

      </div>
      <div id="map-firstpage-guest">
        <p id="map-firstpage-text">지도의 핀을 클릭해보세요 !</p>
      </div>
    </div>
  </div>
);

export default MapGuestSideBarPin;
