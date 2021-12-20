import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'; // 예시 코드

// 로그인 여부 상태 내려주기
// 링크 어떻게 연결할건지 생각해야됌 ..! (해결?)
// eslint 삼항연산자 오류 해결해야된다 짜증난다

import './test.css';

// const Guest = () => {
//   return (
//     <>
//       <Link to="/mypage">
//         <button className="tab">MY PAGE</button>
//       </Link>
//       <Link to="/logout">
//         <button className="tab">LOG OUT</button>
//       </Link>
//     </>
//   );
// };

const User = () => {
  return (
    <>
      <Link to="/login">
        <button className="tab">LOG IN</button>
      </Link>
      <Link to="/signin">
        <button className="tab">SIGN IN</button>
      </Link>
    </>
  );
};

function Nav () {
  const isLogin = useState(true); // 예시 코드
  return (
    <>
      <div id="nav-container">
        <Link to="/">
          <div id="logo" />
        </Link>
        <div id="nav-body">
          <Link to="/map">
            <button className="tab">MAP</button>
          </Link>
          <div id="vertical-hr"></div>
          { isLogin ? <User /> : null }
        </div>
      </div>
    </>
  );
}

export default Nav;
