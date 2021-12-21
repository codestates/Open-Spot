import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './Pages/Home.js'; // Home을 Routes위에 안넣어줘도 맞아 이게 ?
import Switch from './Pages/Switch.js';
import ClientLogin from './Pages/ClientLogin.js';
import ClientSignin from './Pages/ClientSignin.js';
import BusinessLogin from './Pages/BusinessLogin.js';
import BusinessSignin from './Pages/BusinessSignin.js';
import MapGuest from './Pages/MapGuest.js';
import MapUser from './Pages/MapUser.js';

// for redux
import { selectLoginOrSignin, getUserInfo } from './Actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

const Routers = () => {
  const state1 = useSelector(state => state.pageReducer);
  const state2 = useSelector(state => state.userStateReducer);
  const { isLoginTab } = state1;
  const { userInfo } = state2;
  const dispatch = useDispatch();

  console.log(userInfo);

  const handleIsLoginTab = (bool) => {
    dispatch(selectLoginOrSignin(bool));
  };

  const handleUserInfo = (object) => {
    dispatch(getUserInfo(object));
  };

  return (
    <Router>
      <Routes>
        <Route exact={true} path='/' element={<Home handleIsLoginTab={handleIsLoginTab} isLogin={userInfo.isLogin} />} />
        <Route path='/switch' element={<Switch isLoginTab={isLoginTab} />} />
        <Route path='/client/login' element={<ClientLogin handleUserInfo={handleUserInfo} userInfo={userInfo} />} />
        <Route path='/business/login' element={<BusinessLogin handleUserInfo={handleUserInfo} />} />
        <Route path='/client/signin' element={<ClientSignin handleUserInfo={handleUserInfo} />} />
        <Route path='/business/signin' element={<BusinessSignin handleUserInfo={handleUserInfo} />} />
        <Route path='/map/guest' element={<MapGuest />} />
        <Route path='/map/user' element={<MapUser />} />
      </Routes>
    </Router>
  );
};

export default Routers;
