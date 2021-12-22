import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Siderbar from './../Components/MyPageClientSideBar.js';
import ModalModifyInfo from './../Modals/ModalModifyInfo';
import ModalWithDrawal from './../Modals/ModalWithDrawal';
import './../Styles/MyPage.css';
import './../Styles/Header.css';

function ClientMyPage ({ userInfo }) {
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
      { changeInfoBtnClicked ? <ModalModifyInfo handleChangeInfoBtn={ handleChangeInfoBtn } userInfo={ userInfo } /> : null }
      { deleteInfoBtnClicked ? <ModalWithDrawal handleDeleteInfoBtn={ handleDeleteInfoBtn } userInfo={ userInfo } /> : null }
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
                  <button className="tab change-tab-design">LOG OUT</button>
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
                  src="hrv.png"
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
                      {/* userInfo.name */} 닉네임 보여주세요
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
                        {/* userInfo.email */} 이메일 보여주세요
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="change-bt">
              <button className="info-change-bt" onClick={ () => handleChangeInfoBtn(true) }>
                <div className="client-info-change">회원정보 수정</div>
              </button>
              <button className="delete-bt" onClick={ () => handleDeleteInfoBtn(true) }>
                <div className="with-drawal">회원 탈퇴</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ClientMyPage;
