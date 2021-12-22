import React from 'react';
import './../Styles/Modal.css';

function RegisterStore ({ setaddStoreMarkerClicked }) {
  return (
    <div className="modal-background">
      <div className="register-box-container">
        <div className="modify-info">가게 등록 하기</div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>가게 이름</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>주소</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>전화번호</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>주차 여부</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>예약 여부</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modal-confirm-bt">
          <button className="confirm-bt" onClick={ () => setaddStoreMarkerClicked(false) }>등록 완료</button>
        </div>
      </div>
    </div>
  );
}
export default RegisterStore;
