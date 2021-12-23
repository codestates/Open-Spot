import * as React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/Home.css';
import './../Styles/Header.css';
import axios from 'axios';

// input 태그와 button 태그 둘 다 버튼을 만들 수 있음 -> 차이점 뭔지 알아보기

const User = ({ role, handleUserInfo }) => (
  <>
    { role === 'general' ? <Link to="/client/mypage"><button className="tab">MY PAGE</button></Link> : <Link to="/business/mypage"><button className="tab">MY PAGE</button></Link> }
    <Link to="/">
      <button
        className="tab" onClick={
        () => axios.get(
          'https://api.open-spot.tk/auth/local',
          { withCredentials: true })
          .then(() => {
            handleUserInfo({ isLogin: false });
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          })
        }
      >LOG OUT</button>
    </Link>
  </>
);

const Guest = ({ handleIsLoginTab }) => (
  <>
    <Link to="/switch">
      <button className="tab change-tab-design" onClick={ () => handleIsLoginTab(true) }>LOG IN</button>
    </Link>
    <Link to="/switch">
      <button className="tab change-tab-design" onClick={ () => handleIsLoginTab(false) }>SIGN IN</button>
    </Link>
  </>
);

const MapTabUser = () => (
  <Link to="/map/user">
    <button className="tab change-tab-design">
      MAP
    </button>
  </Link>
);
const MapTabGuest = () => (
  <Link to="/map/guest">
    <button className="tab change-tab-design">
      MAP
    </button>
  </Link>
);
const MapButtonUser = () => (
  <Link to="/map/user">
    <button id="home-map-button">
      Map 바로가기
    </button>
  </Link>
);
const MapButtonGuest = () => (
  <Link to="/map/guest">
    <button id="home-map-button">
      Open Spot 체험하러가기
    </button>
  </Link>
);

function Home ({ handleIsLoginTab, userInfo, handleUserInfo }) {
  return (
    <div className="entire-container">
      <div className="main-section">
        <header>
          <div id="nav-container">
            <Link to="/">
              <div id="logo" />
            </Link>
            <div id="nav-body">
              {userInfo.isLogin ? <MapTabUser /> : <MapTabGuest />}
              <div id="vertical-hr"></div>
              {/* 사업자와 일반인을 구분하는 역할 필요 */}
              {userInfo.isLogin ? <User handleUserInfo={ handleUserInfo } role={ userInfo.role } /> : <Guest handleIsLoginTab={ handleIsLoginTab } />}
            </div>
          </div>
        </header>
        <div className="main-container">
          <p id="main-title">새롭게 떠오르는.<br />빠르게 알고싶은.</p>
          {userInfo.isLogin ? <MapButtonUser /> : <MapButtonGuest />}
        </div>
        <div className="down-button-container">
          <i className="fas fa-chevron-down" id="down-icon"></i>
          <p id="down-text">Scroll<br />Down</p>
        </div>
      </div>
      <div className="client-pt-container">
        <div className="about-open-spot-container">
          <div className="second-title">
            <p>Open Spot은 이러합니다</p>
          </div>
        </div>
        <div className="client-pt-section">
          {/* 일반 유저 서비스 소개 섹션 (꾸미기 영역) */}
          <div className="pt-section">
            <div className="pt-map-img"></div>
            <div className="pt-text-box">
              <div className="pt-sequence" id="count-num-home">1</div>
              <div className="pt-text">
                개업을 준비하거나 개업한지 2년이 채 안된 신생 점포들만 추천하는 지도 서비스
              </div>
            </div>
          </div>
          <div className="pt-section">
            <div className="pt-notification-img"></div>
            <div className="pt-text-box">
              <div className="pt-sequence" id="count-num-home">2</div>
              <div className="pt-text">
                좋아하는 가게를 저장하고 가게 정보를 실시간으로 확인할 수 있는 보관함 서비스
              </div>
            </div>
          </div>
          <div className="pt-section">
            <div className="pt-reservation-img"></div>
            <div className="pt-text-box">
              <div className="pt-sequence" id="count-num-home">3</div>
              <div className="pt-text">
                예약 여부, 주차 여부, 개업 날짜를 추적하여 선별된 데이터를 제공하는 서비스
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="business-pt-container">
        {/* 사업자 서비스 소개 섹션 (꾸미기 영역) */}
        <div className="about-business-container">
          <div className="third-title">
            <p>새롭게 오픈한 가게를 등록해보세요!</p>
          </div>
        </div>
        <div className="business-pt-section">
          <div className="business-pt-box">
            <div className="pt-about-business">
              <div className="business-pt-sequence">1.</div>
              <div className="business-pt-text">사업자 번호 등록 서비스 </div>
            </div>
            <div className="pt-detaile-box">
              <div className="detaile-text">사업자 등록 번호 검증 후 회원 등록</div>
              <div className="detaile-box">
                <p>
                  사업자 전용 페이지를 만들어 일반 고객과 분리하여 데이터를 관리하고 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="business-pt-box">
            <div className="pt-about-business">
              <div className="business-pt-sequence">2.</div>
              <div className="business-pt-text">나의 보관함 페이지</div>
            </div>
            <div className="pt-detaile-box">
              <div className="detaile-text">좋아하는 가게 저장 서비스</div>
              <div className="detaile-box">
                <p>
                  점포를 등록할 수 있는 서비스 이외에도 개인적으로 간직하고 싶은 점포를 저장할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="business-pt-box">
            <div className="pt-about-business">
              <div className="business-pt-sequence">3.</div>
              <div className="business-pt-text">나의 점포 관리 페이지</div>
            </div>
            <div className="pt-detaile-box">
              <div className="detaile-text">스토어 관리 서비스, 등록 서비스 제공</div>
              <div className="detaile-box">
                <p>
                  사업자는 마이페이지에서 여러 스토어를 등록 하거나 수정, 삭제할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="business-pt-box">
            <div className="pt-about-business">
              <div className="business-pt-sequence">4.</div>
              <div className="business-pt-text">등록 기간 자동 업데이트</div>
            </div>
            <div className="pt-detaile-box">
              <div className="detaile-text">정보 보관 기간 만료 시 자동 폐기</div>
              <div className="detaile-box">
                <p>
                  등록한 지 2년이 지난 스토어는 자동으로 폐기되어 이 웹의 사용자에게 노출되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        {/* 웹 로고와 팀원들 깃헙 링크 연결 */}
        <div className="open-spot-team">
          <Link to="/">
            <div className="logo-box">
              <div className="open-spot-logo"></div>
            </div>
          </Link>
          <div className="with-people">
            <a href={ 'https://github.com/PippasSong' } id="our-worklog">김동운</a>
            <a href={ 'https://github.com/jyang510' } id="our-worklog">양재영</a>
            <a href={ 'https://github.com/ciocio97' } id="our-worklog">이승연</a>
            <a href={ 'https://github.com/Brian-free1' } id="our-worklog">정채련</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
