import * as React from 'react';

function StoreInfo () {
  return (
    <div className="store-info">
      <div className="store-img-box">
        <div className="store-img"></div>
      </div>
      <div className="store-name">니쿠킹 버거</div>
      <div className="store-detail-info">
        <div className="detail-info">
          <div>주소 : 서울 강서구 강서로 72</div>
          <div>전화번호 : 010-0000-0000</div>
          <div>주차여부 : 가능</div>
          <div>예약 여부 : 가능</div>
        </div>
        <div className="reaction-box">
          <div>💜</div>
          <div className="count">20</div>
        </div>
      </div>
    </div>
  );
}
export default StoreInfo;
