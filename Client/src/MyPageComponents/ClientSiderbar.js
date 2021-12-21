import * as React from 'react';
import { Link } from 'react-router-dom';

function ClientSiderbar () {
  return (
    <div className="sider-bar">
      <Link to="/clientuserinfo">
        <button className="client-info-bt">
          <div className="client-info">회원정보</div>
        </button>
      </Link>
      <Link to="/clientfavoritelist">
        <button className="favorite-li-bt">
          <div className="favorite-li">나의 보관함</div>
        </button>
      </Link>
    </div>
  );
}
export default ClientSiderbar;
