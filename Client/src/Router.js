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
import { selectLoginOrSignin, isUserOrGuest } from './Actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

const Routers = () => {
  const state = useSelector(state => state.pageReducer);
  const { isLoginTab, isUser } = state;
  const dispatch = useDispatch();

  const handleIsLoginTab = (bool) => {
    dispatch(selectLoginOrSignin(bool));
  };

  const handleIsUser = (bool) => {
    dispatch(isUserOrGuest(bool));
  };
  return (
    <Router>
      <Routes>
        <Route exact={true} path='/' element={<Home handleIsLoginTab={handleIsLoginTab} isUser={isUser} />} />
        <Route path='/switch' element={<Switch isLoginTab={isLoginTab} />} />
        <Route path='/client/login' element={<ClientLogin handleIsUser={handleIsUser} />} />
        {/* 여기서 리다이렉트 시키기 */}
        <Route path='/business/login' element={<BusinessLogin handleIsUser={handleIsUser} />} />
        <Route path='/client/signin' element={<ClientSignin handleIsUser={handleIsUser} />} />
        <Route path='/business/signin' element={<BusinessSignin handleIsUser={handleIsUser} />} />
        <Route path='/map/guest' element={<MapGuest />} />
        <Route path='/map/user' element={<MapUser />} />
      </Routes>
    </Router>
  );
};

export default Routers;
