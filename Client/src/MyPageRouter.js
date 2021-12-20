import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// import Siderbar from './Siderbar.js';
// import ClientMyPage from './ClientMyPage.js';
// import ClientFavoriteList from './ClientFavoriteList.js';
import BusinessFavoriteList from './BusinessFavoriteList.js';
import BusinessMyPage from './BusinessMyPage.js';
import BusinessMyStore from './BusinessMyStore.js';

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
