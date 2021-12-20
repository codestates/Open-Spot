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

// for redux
import { selectLoginOrSignin, isUserOrGuest } from './Actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

function Routers () {
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
        <Route element={ <Home isUser={ isUser } switchCheck={ handleIsLoginTab } /> } exact path="/" />
        <Route element={ <Switch isLoginTab={ isLoginTab } /> } path="/switch" />
        <Route element={ <ClientLogin handleIsUser={ handleIsUser } /> } path="/client/login" />
        {/* 여기서 리다이렉트 시키기 */}
        <Route element={ <BusinessLogin handleIsUser={ handleIsUser } /> } path="/business/login" />
        <Route element={ <ClientSignin handleIsUser={ handleIsUser } /> } path="/client/signin" />
        <Route element={ <BusinessSignin handleIsUser={ handleIsUser } /> } path="/business/signin" />
      </Routes>
    </Router>
  );
}

export default Routers;
