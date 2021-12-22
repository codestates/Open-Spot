import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../App.css';
import './../Styles/Signin.css';

// http://open-spot-bucket-deploy.s3-website.ap-northeast-2.amazonaws.com : S3 버킷 주소

function ClientSignin ({ handleUserInfo }) {
  const navigate = useNavigate();
  // DOM에 접근
  const userNameVerDOM = useRef(null);
  const emailVerDOM = useRef(null);
  const passwordVerDOM = useRef(null);
  const chkPasswordDOM = useRef(null);
  const didMount = useRef(false);

  // 유저 입력정보 저장
  const [inputData, setInputData] = useState(
    {
      userName: '',
      email: '',
      password: '',
      verPassword: ''
    }
  );

  // 유효성 검사정보 저장
  const [validationChk, setValidationChk] = useState(
    {
      userName: false,
      email: false,
      password: false,
      verPassword: false
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

  // 회원가입 버튼
  function getSignUp (event) {
    const keys = Object.keys(validationChk);

    for (const key of keys) {
      if (!validationChk[key]) {
        return alert('양식에 맞게 입력해 주세요.');
      }
    }

    const { email, password, userName } = inputData;
    axios.post('https://api.open-spot.tk/users', {
      email,
      password,
      userName
    }).then((res) => {
      console.log(res);
      if (res.data.code === 201) {
        const userInfo = {
          isLogin: true,
          role: res.data.role,
          name: res.data.userName,
          email: res.data.email,
          oauthLogin: res.data.oauthLogin
        };
        handleUserInfo(userInfo);
        navigate('/');
      }
    }).catch((err) => {
      if (err.response.status === 409) {
        handleUserInfo({ isLogin: false });
        return alert('회원가입 실패. 이미 존재하는 이메일입니다.');
      }
      alert('서버 에러');
    });
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

export default ClientSignin;
