import * as React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Siderbar from './../Components/MyPageClientSideBar.js';
import StoreInfo from './../Components/MyPageStoreCard.js';
import axios from 'axios';
import './../Styles/MyPage.css';
import './../Styles/Header.css';
import { getMyFavoriteMarkers } from './../Actions/index.js';

function ClientFavoriteList () {
  const { myFavoriteMarkers } = useSelector(state => state.userStateReducer);

  useEffect(() => {
    axios({
      url: 'https://api.open-spot.tk/users/general-markers',
      method: 'get'
    }).then((res) => {
      const { markers } = res.data;
      markers.forEach((marker) => {
        getMyFavoriteMarkers(marker);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  return (
    <div className="entire-box">
      <div className="intro-bg">
        <header>
          <div id="nav-container">ssss
            <Link to="/">
              <div id="logo" />
            </Link>
            <div id="nav-body">
              <Link to="/map/user">
                <button className="tab change-tab-design">
                  MAP
                </button>
              </Link>
              <div id="vertical-hr"></div>
              <Link to="/client/mypage">
                <button className="tab change-tab-design">MY PAGE</button>
              </Link>
              <Link to="/">
                <button className="tab change-tab-design">LOG OUT</button>
              </Link>
            </div>
          </div>
        </header>
      </div>
      <div className="second-big-box">
        <Siderbar />
        <div id="mypage-vertical-line-wow"></div>
        <div className="favorite-list-container">
          <div id="favorite-list-get-center">
            <div className="favorite-inner-box">
              { myFavoriteMarkers.map((marker, idx) => <StoreInfo key={ idx } marker={ marker } />) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientFavoriteList;