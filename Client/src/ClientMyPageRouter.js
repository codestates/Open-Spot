import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// import Siderbar from './Siderbar.js';
import ClientMyPage from './MyPages/ClientMyPage.js';
import ClientFavoriteList from './MyPages/ClientFavoriteList.js';
// import BusinessFavoriteList from './MyPages/BusinessFavoriteList.js';
// import BusinessMyPage from './MyPages/BusinessMyPage.js';
// import BusinessMyStore from './MyPages/BusinessMyStore';

function MyPageRouter () {
  return (
    <Router>
      <Routes>
        <Route element={ <ClientMyPage /> } exact path="/" />
        <Route element={ <ClientMyPage /> } path="/clientuserinfo" />
        <Route element={ <ClientFavoriteList /> } path="/clientfavoritelist" />
      </Routes>
    </Router>
  );
}
export default MyPageRouter;
