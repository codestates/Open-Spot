import React from 'react';
import ReactDOM from 'react-dom';

// import reportWebVitals from './reportWebVitals';
// import Login from './Login.js';
import './AllMyPage.css';
// import ClientMyPage from './ClientMyPage.js';
// import ClientFavoriteList from './ClientFavoriteList.js';
// import BusinessFavoriteList from './BusinessFavoriteList.js';
// import BusinessMyPage from './BusinessMyPage.js';
// import BusinessMyStore from './BusinessMyStore.js';
// import MyPageRouter from './MyPageRouter.js';
import ClientMyPageRouter from './ClientMyPageRouter.js';

ReactDOM.render(
  <React.StrictMode>
    <ClientMyPageRouter />
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
