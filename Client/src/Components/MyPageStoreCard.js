import * as React from 'react';

function StoreInfo ({ marker }) {
  return (
    <div id="store-card-container">
      <div className="store-info">
        <div className="store-img-box">
          <img className="dongun" src={ `https://api.open-spot.tk/${marker.fileName}` }></img>
        </div>
        <div className="store-name-main">
          {marker.storeName}
        </div>
        <div className="store-detail-info">
          <div className="detail-info">
            <div className="store-info-style-sheet">
              <div className="store-info-title">
                주소
              </div>
              <div className="store-info-property">
                {marker.address}
              </div>
            </div>
            <div className="store-info-style-sheet">
              <div className="store-info-title">
                전화번호
              </div>
              <div className="store-info-property">
                {marker.callNum}
              </div>
            </div>
            <div className="store-info-style-sheet">
              <div className="store-info-title">
                주차여부
              </div>
              <div className="store-info-property">
                {marker.parking ? '가능' : '불가능'}
              </div>
            </div>
            <div className="store-info-style-sheet">
              <div className="store-info-title">
                예약 여부
              </div>
              <div className="store-info-property">
                {marker.booking ? '가능' : '불가능'}
              </div>
            </div>
          </div>
          <div className="store-reaction-box">
            <i className="fas fa-heart" id="store-info-like"></i>
            <div className="store-info-count"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreInfo;
