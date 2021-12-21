import * as React from 'react';
import { Link } from 'react-router-dom';

function Modal () {
  return (
    <div className="change-bt">
      <Link>
        <button className="info-change-bt">
          <div className="client-info-change">회원정보 수정</div>
        </button>
      </Link>
      <Link>
        <button className="delete-bt">
          <div className="with-drawal">회원 탈퇴</div>
        </button>
      </Link>
    </div>
  );
}
export default Modal;
