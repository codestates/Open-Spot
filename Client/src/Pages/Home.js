import * as React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/Home.css';
import './../Styles/Header.css';

// input 태그와 button 태그 둘 다 버튼을 만들 수 있음 -> 차이점 뭔지 알아보기

const User = () => {
  return (
    <>
      <Link to="/mypage">
        <button className="tab">MY PAGE</button>
      </Link>
      <Link to="/">
        <button className="tab">LOG OUT</button>
      </Link>
    </>
  );
};

const Guest = ({ handleIsLoginTab }) => {
  return (
    <>
      <Link to="/switch">
        <button className="tab" onClick={() => handleIsLoginTab(true)}>LOG IN</button>
      </Link>
      <Link to="/switch">
        <button className="tab" onClick={() => handleIsLoginTab(false)}>SIGN IN</button>
      </Link>
    </>
  );
};

const MapTabUser = () => {
  return (
    <Link to="/map/user">
      <button className="tab">
        MAP
      </button>
    </Link>
  );
};
const MapTabGuest = () => {
  return (
    <Link to="/map/guest">
      <button className="tab">
        MAP
      </button>
    </Link>
  );
};
const MapButtonUser = () => {
  return (
    <Link to="/map/user">
      <button id="home-map-button">
        Map 바로가기
      </button>
    </Link>
  );
};
const MapButtonGuest = () => {
  return (
    <Link to="/map/guest">
      <button id="home-map-button">
        Open Spot 체험하러가기
      </button>
    </Link>
  );
};

const Home = ({ handleIsLoginTab, isUser }) => {
  return (
    <>
      <div className="entire-container">
        <div className="main-section">
          <header>
            <div id="nav-container">
              <Link to="/">
                <div id="logo" />
              </Link>
              <div id="nav-body">
                {isUser ? <MapTabUser /> : <MapTabGuest />}
                <div id="vertical-hr"></div>
                {/* 사업자와 일반인을 구분하는 역할 필요 */}
                {isUser ? <User role="역할구분" /> : <Guest handleIsLoginTab={handleIsLoginTab} />}
              </div>
            </div>
          </header>
          <div className="main-container">
            <p id="main-title">새롭게 떠오르는.<br />빠르게 알고싶은.</p>
            {isUser ? <MapButtonUser /> : <MapButtonGuest />}
          </div>
          <div className="down-button-container">
            <i id="down-icon" className="fas fa-chevron-down"></i>
            <p id="down-text">Scroll<br />Down</p>
          </div>
        </div>
        <div className="client-section">
          {/* 일반 유저 서비스 소개 섹션 (꾸미기 영역) */}
          Hello World
        </div>
        <div className="business-section">
          {/* 사업자 서비스 소개 섹션 (꾸미기 영역) */}
          Hello World
        </div>
        <footer>
          {/* 웹 로고와 팀원들 깃헙 링크 연결 */}
          Hello World
        </footer>
      </div>
    </>
  );
};

export default Home;
