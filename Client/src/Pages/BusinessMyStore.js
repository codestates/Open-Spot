import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Siderbar from './../Components/MyPageBusinessSideBar.js';
import StoreInfo from './../Components/MyPageStoreCard.js';
import ModalRegisterStore from './../Modals/ModalRegisterStore.js';
import axios from 'axios';
import './../Styles/MyPage.css';
import './../Styles/Header.css';
import { getMyStoreMarkers, getMyFavoriteMarkers } from './../Actions/index.js';

function BusinessMyStore ({ handleUserInfo }) {
  const dispatch = useDispatch();
  const { myStoreMarkers } = useSelector(state => state.userStateReducer);
  const [addStoreMarkerClicked, setaddStoreMarkerClicked] = useState(false);

  const handleAddStoreMarkerBtn = (bool) => {
    setaddStoreMarkerClicked(bool);
  };

  useEffect(() => {
    axios({
      url: 'https://api.open-spot.tk/users/business-markers',
      method: 'get',
      withCredentials: true
    }).then((res) => {
      const { markers } = res.data;
      markers.forEach((marker) => {
        dispatch(getMyStoreMarkers(marker));
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      { addStoreMarkerClicked ? <ModalRegisterStore setaddStoreMarkerClicked={ setaddStoreMarkerClicked } /> : null }
      <div className="entire-box">
        <div className="intro-bg">
          <header>
            <div id="nav-container">
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
                <Link to="/business/mypage">
                  <button className="tab change-tab-design">MY PAGE</button>
                </Link>
                <Link to="/">
                  <button
                    className="tab change-tab-design" onClick={
                    () => axios.get(
                      'https://api.open-spot.tk/auth/local',
                      { withCredentials: true })
                      .then(() => {
                        handleUserInfo({
                          isLogin: false,
                          role: null,
                          name: null,
                          email: null,
                          profile: null,
                          oauthLogin: null
                        });
                        dispatch(getMyFavoriteMarkers([]));
                      })
                      .catch((err) => {
                        alert(err);
                        console.log(err);
                      })
                    }
                  >LOG OUT</button>
                </Link>
              </div>
            </div>
          </header>
        </div>
        <div className="second-big-box">
          <Siderbar />
          <div id="mypage-vertical-line-wow"></div>
          <div className="store-inner-box">
            <div>
              <button className="register-bt" onClick={ () => handleAddStoreMarkerBtn(true) }>
                <div className="change" id="add-cursoromg">?????? ?????? ??????</div>
              </button>
            </div>
            <div className="aside"></div>
            <div className="divider"></div>
            <div className="favorite-list-container">
              <div id="favorite-list-get-center">
                <div className="favorite-inner-box">
                  { myStoreMarkers.map((marker, idx) => <StoreInfo key={ idx } marker={ marker } />) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessMyStore;
