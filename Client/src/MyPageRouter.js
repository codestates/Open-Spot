import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// import ClientMyPage from './ClientMyPage.js';
// import ClientFavoriteList from './ClientFavoriteList.js';
import BusinessFavoriteList from './MyPages/BusinessFavoriteList.js';
import BusinessMyPage from './MyPages/BusinessMyPage.js';
import BusinessMyStore from './MyPages/BusinessMyStore';

function MyPageRouter () {
  return (
    <Router>
      <Routes>
        <Route element={ <BusinessMyPage /> } exact path="/" />
        <Route element={ <BusinessMyPage /> } path="/userinfo" />
        <Route element={ <BusinessFavoriteList /> } path="/favoritelist" />
        <Route element={ <BusinessMyStore /> } path="/mystore" />
      </Routes>
    </Router>
  );
}
export default MyPageRouter;
