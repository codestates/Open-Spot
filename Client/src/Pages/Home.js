import * as React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/Home.css';
import './../Styles/Header.css';
import axios from 'axios';

// input 태그와 button 태그 둘 다 버튼을 만들 수 있음 -> 차이점 뭔지 알아보기

const User = ({ role }) => (
  <>
    { role === 'general' ? <Link to="/client/mypage"><button className="tab">MY PAGE</button></Link> : <Link to="/business/mypage"><button className="tab">MY PAGE</button></Link> }
    <Link to="/">
      <button className="tab" onClick={ () => axios.get('https://api.open-spot.tk/auth/local', { withCredentials: true }) }>LOG OUT</button>
    </Link>
  </>
);

const Guest = ({ handleIsLoginTab }) => (
  <>
    <Link to="/switch">
      <button className="tab" onClick={ () => handleIsLoginTab(true) }>LOG IN</button>
    </Link>
    <Link to="/switch">
      <button className="tab" onClick={ () => handleIsLoginTab(false) }>SIGN IN</button>
    </Link>
  </>
);

const MapTabUser = () => (
  <Link to="/map/user">
    <button className="tab">
      MAP
    </button>
  </Link>
);
const MapTabGuest = () => (
  <Link to="/map/guest">
    <button className="tab">
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

function Home ({ handleIsLoginTab, userInfo }) {
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
              {userInfo.isLogin ? <User role={ userInfo.role } /> : <Guest handleIsLoginTab={ handleIsLoginTab } />}
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
              <div className="pt-sequence">1</div>
              <div className="pt-text">
                소비자의 취향을 고려한 새로운 장소 추천
              </div>
            </div>
          </div>
          <div className="pt-section">
            <div className="pt-notification-img"></div>
            <div className="pt-text-box">
              <div className="pt-sequence">2</div>
              <div className="pt-text">
                실시간 업데이트를 통한 오픈 가게 알림 서비스
              </div>
            </div>
          </div>
          <div className="pt-section">
            <div className="pt-reservation-img"></div>
            <div className="pt-text-box">
              <div className="pt-sequence">3</div>
              <div className="pt-text">
                실시간 중계 서비스를 통해 웨이팅 불만 해소
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
                  사업자 전용 페이지를 만들어<br /> 일반 고객과 분리하여 데이터를<br /> 관리하고 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="business-pt-box">
            <div className="pt-about-business">
              <div className="business-pt-sequence">2.</div>
              <div className="business-pt-text">사업자 스토어 등록 알림</div>
            </div>
            <div className="pt-detaile-box">
              <div className="detaile-text">스토어 등록시 전체 알림 서비스</div>
              <div className="detaile-box">
                <p>
                  마이페이지에서 스토어를 등록하면<br /> 등록과 동시에 이 웹을 이용하고 있는<br /> 모든 고객들에게 알림이 갑니다.
                </p>
              </div>
            </div>
          </div>
          <div className="business-pt-box">
            <div className="pt-about-business">
              <div className="business-pt-sequence">3.</div>
              <div className="business-pt-text">사업자 전용 마이페이지</div>
            </div>
            <div className="pt-detaile-box">
              <div className="detaile-text">스토어 관리 서비스, 등록 서비스 제공</div>
              <div className="detaile-box">
                <p>
                  사업자는 마이페이지에서<br /> 여러 스토어를 등록 하거나 수정,<br /> 삭제할 수 있습니다.
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
                  등록한 지 2년이 지난 스토어는<br /> 자동으로 폐기되어 이 웹의 사용자에게<br /> 노출되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        {/* 웹 로고와 팀원들 깃헙 링크 연결 */}
        <div className="open-spot-team">
          <div className="logo-box">
            <div className="open-spot-logo"></div>
          </div>
          <div className="with-people">
            <div>김동운</div>
            <div>양재영</div>
            <div>이승연</div>
            <div>정채련</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
