import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './../Styles/Modal.css';

// role에 따라 일반사용자 정보 수정 사업자 정보 수정 해야합니다 !!
function ModalBox ({ handleChangeInfoBtn, userInfo }) {
  const [newName, setNewName] = useState(null); // userInfo.name 넣어주기
  const [newEmail, setNewEmail] = useState(null); // userInfo.email 넣어주기
  const [newPassword, setNewPassword] = useState('');
  const [isCoincidence, setIsCoincidence] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailValidation = (email) => (
    // eslint-disable-next-line
     /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email)
  );

  const handleNewName = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const handleNewEmail = (event) => {
    const email = event.target.value;
    const bool = emailValidation(email);
    setNewEmail(email);
    setIsValidEmail(bool);
  };

  const handleNewPassword = (event) => {
    const password = event.target.value;
    setNewPassword(password);
  };

  const handleConfirmPassword = (event) => {
    const password = event.target.value;
    if (newPassword === password) setIsCoincidence(true);
    else setIsCoincidence(false);
  };

  const changeUserInfo = () => {
    if (isCoincidence) {
      const newUserInfo = {
        newUserName: newName === '' ? userInfo.name : newName,
        newEmail: newEmail === '' ? userInfo.email : newEmail,
        newPassword: newPassword
      };
      axios({
        url: 'https://api.open-spot.tk/users',
        method: 'patch',
        data: newUserInfo,
        withCredentials: true
      }).then((res) => {
        console.log(res.data);
        // 회원정보 수정이 완료되면 닫아야지.
        handleChangeInfoBtn(false);
      })
        .catch((err) => {
          console.log(err);
          alert('잘못 수정된 정보가 있습니다. 수정 후 시도해주세요.');
        });
    }
  };

  return (
    <div className="modal-background">
      <div className="modify-info-box">
        <div className="modify-info">회원 정보 수정</div>
        <div id="modal-modify-input-container">
          <div className="modify-box">
            <div className="modal-input-box">
              <div className="modal-text-vertical-wow">이름</div>
            </div>
            <div className="modal-input-area">
              <div>
                <input
                  className="modal-input-syle-wow" name="text-nmae" onChange={ handleNewName }
                  placeholder={ userInfo.name }
                  size="30"
                  type="text"
                ></input>
              </div>
            </div>
          </div>
          <div className="modify-box">
            <div className="modal-input-box">
              <div className="modal-text-vertical-wow">이메일</div>
            </div>
            <div className="modal-input-area">
              <div>
                <input
                  className="modal-input-syle-wow" name="text-nmae" onChange={ handleNewEmail }
                  placeholder={ userInfo.email }
                  size="30"
                  type="text"
                ></input>
              </div>
            </div>
          </div>
          <div id="modal-do-not-coincidence">{isValidEmail ? '' : '유효한 이메일이 아닙니다'}</div>
          <div className="modify-box">
            <div className="modal-input-box">
              <div className="modal-text-vertical-wow">비밀번호</div>
            </div>
            <div className="modal-input-area">
              <div>
                <input
                  className="modal-input-syle-wow" name="text-nmae" onChange={ handleNewPassword }
                  placeholder="변경하실 비밀번호를 입력해주세요"
                  size="30"
                  type="password"
                ></input>
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
                  className="modal-input-syle-wow" name="text-nmae" onChange={ handleConfirmPassword }
                  placeholder="변경하신 비밀번호를 한번 더 입력해주세요"
                  size="30"
                  type="password"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="resolve-problem-align" id="modal-do-not-coincidence">{ newPassword === '' ? null : isCoincidence ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}</div>
        <div className="modal-confirm-bt">
          <button className="confirm-bt" onClick={ () => { changeUserInfo(); } }>수정 완료</button>
          <button className="confirm-bt" onClick={ () => handleChangeInfoBtn(false) }>다음에 변경</button>
        </div>
      </div>
    </div>
  );
}
export default ModalBox;
