import React from 'react';
import './../ModalBox.css';

function ModalBox () {
  return (
    <div className="modal-background">
      <div className="modify-info-box">
        <div className="modify-info">그동안 감사했습니다:)</div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>탈퇴 사유</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input id="withdrawal" size="30" type="text" ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>비밀 번호 확인</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input name="text-nmae" size="30" type="text" ></input>
            </div>
          </div>
        </div>
        <button className="withdrawal-bt">탈퇴 완료</button>
      </div>
    </div>
  );
}
export default ModalBox;
