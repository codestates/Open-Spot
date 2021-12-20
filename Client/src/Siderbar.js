import * as React from 'react';
import { Link } from 'react-router-dom';
import './Siderbar.css';

function Siderbar () {
  return (
    <div className="sider-bar">
      <Link to="/userinfo">
        <button className="client-info-bt">
          <div className="client-info">회원정보</div>
        </button>
      </Link>
      <Link to="/favoritelist">
        <button className="favorite-li-bt">
          <div className="favorite-li">나의 보관함</div>
        </button>
      </Link>
      <Link to="/mystore">
        <button className="my-store-bt">
          <div className="my-store-li">나의 가게함</div>
        </button>
      </Link>
    </div>
  );
}
export default Siderbar;
