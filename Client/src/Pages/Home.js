import React from 'react';
import './../Styles/Home.css';

// input 태그와 button 태그 둘 다 버튼을 만들 수 있음 -> 차이점 뭔지 알아보기

function Home () {
  return (
    <>
      <div className="entire-container">
        <div className="main-section">
          <header />
          <div className="main-container">
            <p id="main-title">새롭게 떠오르는.<br />빠르게 알고싶은.</p>
            <button className="map-button">Open Spot 체험하러가기</button>
            {/* <button className="map-button">Map 구경가기</button> */}
          </div>
          <div className="down-button-container">
            <i className="fas fa-chevron-down" id="down-icon"></i>
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
}

export default Home;
