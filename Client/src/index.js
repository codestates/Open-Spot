import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './Store/Store.js';
import { Provider } from 'react-redux';
// test
import Router from './Router.js';
// import MapUser from './Pages/MapUser.js';
// import MapGuest from './Pages/MapGuest.js';
// import reportWebVitals from './reportWebVitals';
// import Login from './Login.js';
// import './AllMyPage.css';
// import ClientMyPage from './MyPages/ClientMyPage.js';
// import ClientFavoriteList from './ClientFavoriteList.js';
// import BusinessFavoriteList from './BusinessFavoriteList.js';
// import BusinessMyPage from './BusinessMyPage.js';
// import BusinessMyStore from './BusinessMyStore.js';
// import MyPageRouter from './MyPageRouter.js';
// import ClientMyPageRouter from './ClientMyPageRouter.js';
// import WithDrawal from './Modals/WithDrawal';
// import ModalBox from './Modals/ModalBox';
// import RegisterStore from './Modals/RegisterStore';

ReactDOM.render(
  <Provider store={ store }>
    <Router />
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
