import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../Styles/Signin.css';

// http://open-spot-bucket-deploy.s3-website.ap-northeast-2.amazonaws.com : S3 버킷 주소

function BusinessSignin () {
  // DOM에 접근
  const userNameVerDOM = useRef(null);
  const emailVerDOM = useRef(null);
  const passwordVerDOM = useRef(null);
  const chkPasswordDOM = useRef(null);
  const companyNumbersVerDOM = useRef(null);
  const didMount = useRef(false);

  // 유저 입력정보 저장
  const [inputData, setInputData] = useState(
    {
      userName: '',
      email: '',
      password: '',
      verPassword: '',
      companyNumberFst: '',
      companyNumberSec: '',
      companyNumberTrd: ''

    }
  );

  // 유효성 검사정보 저장
  const [validationChk, setValidationChk] = useState(
    {
      userName: false,
      email: false,
      password: false,
      verPassword: false,
      companyNumbers: false
    }
  );

  const handleUserName = (event) => {
    const userName = event.target.value;
    setInputData({
      ...inputData,
      userName
    });
  };

  const handleEmail = (event) => {
    const email = event.target.value;
    setInputData({
      ...inputData,
      email
    });
  };

  const handlePassword = (event) => {
    const password = event.target.value;
    setInputData({
      ...inputData,
      password
    });
  };

  const handleVerPassword = (event) => {
    const verPassword = event.target.value;
    setInputData({
      ...inputData,
      verPassword
    });
  };

  // 사업자번호 인증을 받은 상태에서 번호를 변경하면 인증 상태를 변경한다.
  const handleCompanyNumberFst = (event) => {
    const companyNumberFst = event.target.value;
    setInputData({
      ...inputData,
      companyNumberFst
    });
    setValidationChk({ ...validationChk, companyNumbers: false });
  };

  const handleCompanyNumberSec = (event) => {
    const companyNumberSec = event.target.value;
    setInputData({
      ...inputData,
      companyNumberSec
    });
    setValidationChk({ ...validationChk, companyNumbers: false });
  };

  const handleCompanyNumberTrd = (event) => {
    const companyNumberTrd = event.target.value;
    setInputData({
      ...inputData,
      companyNumberTrd
    });
    setValidationChk({ ...validationChk, companyNumbers: false });
  };

  // 회원가입 버튼
  function getSignUp () {
    const keys = Object.keys(validationChk);

    for (const key of keys) {
      if (!validationChk[key]) {
        return alert('양식에 맞게 입력해 주세요.');
      }
    }

    const { email, password, userName, companyNumberFst, companyNumberSec, companyNumberTrd } = inputData;
    const companyNumbers = ''.concat(companyNumberFst, companyNumberSec, companyNumberTrd);
    axios.post('https://api.open-spot.tk/users', {
      email,
      password,
      userName,
      companyNumbers
    }).then((response) => {
      console.log(response);
      if (response.data.code === 201) {
        alert('회원가입 성공');
      }
    }).catch((err) => {
      if (err.response.status === 409) {
        return alert('회원가입 실패. 이미 존재하는 이메일입니다.');
      }
      alert('서버 에러');
    });
  }

  // 사업자 인증 버튼
  function getCompanyNumberValidation () {
    if (isValidCompanyNumber(inputData.companyNumberFst, inputData.companyNumberSec, inputData.companyNumberTrd)) {
      setValidationChk({ ...validationChk, companyNumbers: true });
      companyNumbersVerDOM.current.textContent = '유효한 사업자 번호입나다.';
    } else {
      companyNumbersVerDOM.current.textContent = '000-00-00000 형식의 사업자 번호를 입력해 주세요.';
    }
  }

  // 사업자번호 유효성 검사 함수
  function isValidCompanyNumber (companyNumberFst, companyNumberSec, companyNumberTrd) {
    const companyNumbers = `${companyNumberFst}-${companyNumberSec}-${companyNumberTrd}`;
    // eslint-disable-next-line
    return /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/.test(companyNumbers);
  }

  // 닉네임 유효성 검사 함수
  function isValidUserName (userName) {
    if (userName !== '') return true;
    return false;
  }

  // 이메일 유효성 검사 함수
  function isValidEmail (email) {
    // eslint-disable-next-line
    return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[0-9a-zA-Z]{2,3}$/.test(email);
  }

  // 비밀번호 유효성 검사 함수
  // 알파벳 대소문자, 숫자 조합 5 ~ 10글자
  function isValidPassword (password) {
    // eslint-disable-next-line
    return /^[0-9a-zA-Z]{5,10}/.test(password);
  }

  // 비밀번호 일치여부 확인
  function chkPassowrdMatch () {
    return inputData.password === inputData.verPassword;
  }

  // 첫 렌더링 때는 실행되지 않는다
  useEffect(() => {
    if (didMount.current) {
      setValidationChk({ ...validationChk, userName: isValidUserName(inputData.userName), email: isValidEmail(inputData.email), password: isValidPassword(inputData.password), verPassword: chkPassowrdMatch() });
    }
  }, [inputData]);

  useEffect(() => {
    if (didMount.current) {
      if (inputData.userName === '') {
        userNameVerDOM.current.textContent = '닉네임의 형식이 올바르지 않습니다';
      } else if (validationChk.userName) {
        userNameVerDOM.current.textContent = null;
      } else {
        userNameVerDOM.current.textContent = '닉네임의 형식이 올바르지 않습니다';
      }

      if (validationChk.email) {
        emailVerDOM.current.textContent = '유효한 이메일 주소입니다.';
      } else if (inputData.email === '') {
        emailVerDOM.current.textContent = null;
      } else {
        emailVerDOM.current.textContent = '이메일의 형식이 올바르지 않습니다.';
      }

      if (validationChk.password) {
        passwordVerDOM.current.textContent = '유효한 비밀번호입니다.';
      } else if (inputData.password === '') {
        passwordVerDOM.current.textContent = null;
      } else {
        passwordVerDOM.current.textContent = '알파벳 대소문자, 숫자 조합 5 ~ 10글자로 입력해 주세요.';
      }

      if (inputData.verPassword === '') {
        chkPasswordDOM.current.textContent = null;
      } else if (validationChk.verPassword) {
        chkPasswordDOM.current.textContent = '비밀번호가 일치합니다.';
      } else {
        chkPasswordDOM.current.textContent = '비밀번호가 일치하지 않습니다.';
      }
    } else {
      didMount.current = true;
    }
  }, [validationChk]);
  return (
    <>
      <div className="background">
        <header>
          <Link to="/">
            <div id="logo" />
          </Link>
        </header>
        <div className="container">
          <div>
            <p id="title">
              SIGN IN
            </p>
            {/* client, business 구분자 */}
            <div className="auth-container">
              <p className="sub-title">
                사업자 인증
              </p>
              <div className="business-code-container">
                <input className="base-input input-business-code" onChange={ handleCompanyNumberFst } />
                <input className="base-input input-business-code" onChange={ handleCompanyNumberSec } />
                <input className="base-input input-business-code" onChange={ handleCompanyNumberTrd } />
              </div>
              <div className="verification" ref={ companyNumbersVerDOM }>
                {/* 이미 사용된 사업자 번호입니다/(통과) or 사업자 번호 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <button className="base-button business-button" onClick={ getCompanyNumberValidation }>사업자 번호 인증하기</button>
            </div>
            {/* client, business 구분자 */}
            <div id="input-container-signin">
              <p className="sub-title">
                사용자 개인 정보
              </p>
              <input className="base-input" onChange={ handleUserName } placeholder="닉네임" />
              <div className="verification" ref={ userNameVerDOM }>
                {/* 닉네임이 중복됩니다/(통과) or 닉네임의 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <input className="base-input" onChange={ handleEmail } placeholder="이메일" />
              <div className="verification" ref={ emailVerDOM }>
                {/* 이메일이 중복됩니다/(통과) or 이메일의 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <input className="base-input" onChange={ handlePassword } placeholder="비밀번호" />
              <div className="verification" ref={ passwordVerDOM }>
                {/* 비밀번호의 형식이 올바르지 않습니다/(통과) -문구 띄우기 */}
              </div>
              <input className="base-input" onChange={ handleVerPassword } placeholder="비밀번호 확인" />
              <div className="verification" ref={ chkPasswordDOM }>
                {/* 비밀번호가 일치합니다/비밀번호가 일치하지 않습니다 -문구 띄우기 */}
              </div>
              <button className="base-button business-button" onClick={ getSignUp }>회원 가입</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSignin;
