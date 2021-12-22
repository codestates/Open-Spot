import * as React from 'react';
import { useEffect } from 'react';
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
import ClientUserInfo from './Pages/ClientUserInfo.js';
import ClientFavoriteList from './Pages/ClientFavoriteList.js';
import BusinessFavoriteList from './Pages/BusinessFavoriteList.js';
import BusinessUserInfo from './Pages/BusinessUserInfo.js';
import BusinessMyStore from './Pages/BusinessMyStore.js';

// for redux
import {
  selectLoginOrSignin,
  getUserInfo,
  selectSocialLoginBtn
} from './Actions/index.js';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Routers = () => {
  const state1 = useSelector(state => state.pageReducer);
  const state2 = useSelector(state => state.userStateReducer);
  const { isLoginTab } = state1;
  const { userInfo } = state2;
  const dispatch = useDispatch();

  const handleIsLoginTab = (bool) => {
    dispatch(selectLoginOrSignin(bool));
  };

  const handleUserInfo = (object) => {
    dispatch(getUserInfo(object));
  };

  const handleSocialLoginBtn = (object) => {
    dispatch(selectSocialLoginBtn(object));
  };

  // OAuth
  const getToken = async (authorizationCode, socialButtonName) => {
    switch (socialButtonName) {
      case 'google':
        await axios({
          url: 'https://api.open-spot.tk/auth/google',
          method: 'post',
          data: { authorizationCode }
        }).then((res) => {
          const userInfo = {
            isLogin: true,
            role: res.data.role,
            name: res.data.userName,
            email: res.data.email,
            profile: res.data.profile
          };
          handleUserInfo(userInfo);
        }).catch((err) => {
          console.log(err);
          handleUserInfo({ isLogin: false });
        });
        break;
      case 'naver':
        await axios({
          url: 'https://api.open-spot.tk/auth/naver',
          method: 'post',
          data: { authorizationCode }
        }).then((res) => {
          const userInfo = {
            isLogin: true,
            role: res.data.role,
            name: res.data.userName,
            email: res.data.email,
            profile: res.data.profile
          };
          handleUserInfo(userInfo);
        }).catch((err) => {
          console.log(err);
          handleUserInfo({ isLogin: false });
        });
        break;
      case 'kakao':
        await axios({
          url: 'https://api.open-spot.tk/auth/kakao',
          method: 'post',
          data: { authorizationCode }
        }).then((res) => {
          const userInfo = {
            isLogin: true,
            role: res.data.role,
            name: res.data.userName,
            email: res.data.email,
            profile: res.data.profile
          };
          handleUserInfo(userInfo);
        }).catch((err) => {
          console.log(err);
          handleUserInfo({ isLogin: false });
        });
        break;
      default:
        console.log('Hello World');
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    // console.log(`지금 url의 값은 ${url}`);
    const authorizationCode = url.searchParams.get('code');
    // console.log(`authorizationCode 값은 ${authorizationCode}`);
    if (authorizationCode) {
      // for (const btn in socialLoginBtn) {
      //   if (socialLoginBtn[btn] === true) {
      //     getToken(authorizationCode, btn);
      //   };
      // };
      const dataObj = JSON.parse(window.localStorage.getItem('socialBtn')); // JSON.parse 너 이 녀석
      console.log(dataObj);
      for (const btn in dataObj) {
        if (dataObj[btn] === true) {
          getToken(authorizationCode, btn);
          window.localStorage.removeItem('socialBtn');
        }
      }
    }
  });

  return (
    <Router>
      <Routes>
        <Route element={ <Home handleIsLoginTab={ handleIsLoginTab } handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> } exact path="/" />
        <Route element={ <Switch isLoginTab={ isLoginTab } /> } path="/switch" />
        <Route element={ <ClientLogin handleSocialLoginBtn={ handleSocialLoginBtn } handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> } path="/client/login" />
        <Route element={ <BusinessLogin handleUserInfo={ handleUserInfo } /> } path="/business/login" />
        <Route element={ <ClientSignin handleUserInfo={ handleUserInfo } /> } path="/client/signin" />
        <Route element={ <BusinessSignin handleUserInfo={ handleUserInfo } /> } path="/business/signin" />
        <Route element={ <MapGuest /> } path="/map/guest" />
        <Route element={ <MapUser userInfo={ userInfo } /> } path="/map/user" />
        <Route
          element={ <ClientUserInfo handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> } exact path="/client/mypage"
          userInfo={ userInfo }
        />
        <Route
          element={ <ClientUserInfo handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> } path="/client/userinfo"
        />
        <Route element={ <ClientFavoriteList handleUserInfo={ handleUserInfo } /> } path="/client/favoritelist" />
        <Route
          element={ <BusinessUserInfo userInfo={ userInfo } /> } exact path="/business/mypage"
        />
        <Route
          element={ <BusinessUserInfo handleUserInfo={ handleUserInfo } userInfo={ userInfo } /> } path="/business/userinfo"
        />
        <Route element={ <BusinessFavoriteList handleUserInfo={ handleUserInfo } /> } path="/business/favoritelist" />
        <Route element={ <BusinessMyStore handleUserInfo={ handleUserInfo } /> } path="/business/mystore" />
      </Routes>
    </Router>
  );
};

export default Routers;
