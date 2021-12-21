import React from 'react';
import ReactDOM from 'react-dom';
import store from './Store/Store.js';
import { Provider } from 'react-redux';
// test
import Router from './Router.js';
import './index.css';
// 마이페이지 모음
// import MyPageBusinessRouter from './MyPageBusinessRouter'; // 사업자 유저 MyPage
// import MyPageClientRouter from './MyPageClientRouter.js'; // 일반 유저 MyPage
// 모달창 모음
// import ModalWithDrawal from './Modals/ModalWithDrawal'; // 회원 탈퇴 모달창
// import ModalModifyInfo from './Modals/ModalModifyInfo'; // 회원 정보 수정 모달창
// import ModalRegisterStore from './Modals/ModalRegisterStore'; // 가게 등록 모달창

ReactDOM.render(
  <Provider store={ store }>
    <Router />
  </Provider>,
  document.getElementById('root')
);
