import * as React from 'react';
import { Link } from 'react-router-dom';
import './../Styles/Switch.css';
import './../App.css';

const LinkToLogin = () => (
  <>
    <Link to="/client/login">
      <div className="circle-button">
        <strong>개인</strong>입니다
      </div>
    </Link>
    <div id="select-vertical-hr" />
    <Link to="/business/login">
      <div className="circle-button">
        <strong>사업자</strong>입니다
      </div>
    </Link>
  </>
);

const LinkToSignin = () => (
  <>
    <Link to="/client/signin">
      <div className="circle-button">
        <strong>개인</strong>입니다
      </div>
    </Link>
    <div id="select-vertical-hr" />
    <Link to="/business/signin">
      <div className="circle-button">
        <strong>사업자</strong>입니다
      </div>
    </Link>
  </>
);

function Switch ({ isLoginTab }) {
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
              Who You are ?
            </p>
            <div className="button-container ">
              { isLoginTab ? <LinkToLogin /> : <LinkToSignin /> }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Switch;
