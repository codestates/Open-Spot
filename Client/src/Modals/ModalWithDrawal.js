import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import './../Styles/Modal.css';

function ModalBox ({ handleDeleteInfoBtn }) {
  const [withdrawalReason, setWithdrawalReason] = useState('');
  const [password, setPassword] = useState(null);
  const handleWithdrawalReason = (event) => {
    const reason = event.target.value;
    setWithdrawalReason(reason);
  };
  const handlePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };
  const deleteUserInfo = () => {
    axios({
      url: 'https://api.open-spot.tk/users',
      delete: 'delete',
      data: {
        quitReason: withdrawalReason,
        password: password
      }
    }).then((res) => {
      console.log(res);
      alert('그동안 이용해주셔서 감사합니다 :)');
      handleDeleteInfoBtn(true);
    }).catch((err) => {
      console.log(err);
      alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
    });
  };
  return (
    <div className="modal-background">
      <div className="modify-info-box">
        <div className="modify-info">그동안 감사했습니다:)</div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div className="modal-text-vertical-wow">탈퇴 사유</div>
          </div>
          <div className="modal-input-area">
            <div>
              {/* <input id="withdrawal" size="30" type="text" ></input> */}
              <textarea
                className="modal-input-syle-wow"
                id="resolve-problem" onChange={ handleWithdrawalReason } placeholder="탈퇴 사유를 입력해주세요"
                size="30"
                type="text"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div className="modal-text-vertical-wow">비밀 번호 확인</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handlePassword } placeholder="비밀번호를 입력해주세요"
                size="30"
              ></input>
            </div>
          </div>
        </div>
        <div id="withdraqal-flex-party">
          <button className="confirm-bt withdrawal-bt" onClick={ () => deleteUserInfo() }>탈퇴 완료</button>
          <button className="confirm-bt" onClick={ () => handleDeleteInfoBtn(false) }>다음에 할게요</button>
        </div>
      </div>
    </div>
  );
}
export default ModalBox;
