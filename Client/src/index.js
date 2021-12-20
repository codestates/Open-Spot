import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './Store/Store.js';
import { Provider } from 'react-redux';

// test
import Router from './Router.js';
// import MapUser from './Pages/MapUser.js';
// import MapGuest from './Pages/MapGuest.js';

// const bool = true;

ReactDOM.render(
  <Provider store={ store }>
    {/* {bool ? <MapGuest /> : <MapUser />} */}
    <Router />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
