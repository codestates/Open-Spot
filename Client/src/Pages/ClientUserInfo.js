import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Siderbar from './../Components/MyPageClientSideBar.js';
import ModalModifyInfo from './../Modals/ModalModifyInfo';
import ModalWithDrawal from './../Modals/ModalWithDrawal';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './../Styles/MyPage.css';
import './../Styles/Header.css';
import { getMyFavoriteMarkers } from './../Actions/index.js';

function ClientMyPage ({ userInfo, handleUserInfo }) {
  const dispatch = useDispatch();
  const [changeInfoBtnClicked, setChangeInfoBtnClicked] = useState(false);
  const [deleteInfoBtnClicked, setDeleteInfoBtnClicked] = useState(false);
  const handleChangeInfoBtn = (bool) => {
    setChangeInfoBtnClicked(bool);
  };
  const handleDeleteInfoBtn = (bool) => {
    setDeleteInfoBtnClicked(bool);
  };
  return (
    <>
      { changeInfoBtnClicked ? <ModalModifyInfo handleChangeInfoBtn={ handleChangeInfoBtn } handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> : null }
      { deleteInfoBtnClicked ? <ModalWithDrawal handleDeleteInfoBtn={ handleDeleteInfoBtn } handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> : null }
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
                <Link to="/client/mypage">
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
          <div className="my-page-inner-box">
            <div className="client-info-box">
              <div className="client-img-box">
                <img
                  className="client-img"
                  height="100"
                  src={ `${userInfo.profile}` }
                  width="100"
                />
              </div>
              <div className="info-box">
                <div className="name-box">
                  <div className="name">
                    <div>이름</div>
                  </div>
                  <div className="name-area">
                    <div className="mypage-userinfo-input-wow">
                      {userInfo.name}
                    </div>
                  </div>
                </div>
                <div className="name-box">
                  <div className="name">
                    <div>e-mail</div>
                  </div>
                  <div className="name-area">
                    <div className="mypage-userinfo-input-wow">
                      <div>
                        {userInfo.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {userInfo.oauthLogin
              ? null
              : <div className="change-bt">
                <button className="info-change-bt" onClick={ () => handleChangeInfoBtn(true) }>
                  <div className="client-info-change">회원정보 수정</div>
                </button>
                <button className="delete-bt" onClick={ () => handleDeleteInfoBtn(true) }>
                  <div className="with-drawal">회원 탈퇴</div>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientMyPage;
