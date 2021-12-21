import React from 'react';
import './../ModalBox.css';

function ModalBox () {
  return (
    <div className="modal-background">
      <div className="modify-info-box">
        <div className="modify-info">회원 정보 수정</div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>이름</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input name="text-nmae" size="30" type="text" ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>이메일</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input name="text-nmae" size="30" type="text"></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>비밀번호</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input name="text-nmae" size="30" type="text"></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>비밀 번호 확인</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input name="text-nmae" size="30" type="text"></input>
            </div>
          </div>
        </div>
        <div className="modal-confirm-bt">
          <button className="confirm-bt">수정 완료</button>
        </div>
      </div>
    </div>
  );
}
export default ModalBox;
