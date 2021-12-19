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
import { selectLoginOrSignin } from './Actions/index.js';
import { useSelector, useDispatch } from 'react-redux';

function Routers () {
  const state = useSelector(state => state.pageReducer);
  const { isLoginTab } = state;
  const dispatch = useDispatch();

  const handleGuestClick = (bool) => {
    dispatch(selectLoginOrSignin(bool));
  };
  // const [isLoginTab, setIsLoginTab] = useState(null);
  // const clickLoginTab = () => {
  //   setIsLoginTab(true);
  //   console.log(isLoginTab);
  // };
  // const clickSigninTab = () => {
  //   setIsLoginTab(false);
  //   console.log(isLoginTab);
  // };
  return (
    <Router>
      <Routes>
        <Route exact={true} path='/' element={<Home check1={handleGuestClick} />} />
        <Route path='/switch' element={<Switch isLoginTab={isLoginTab} />} />
          <Route path='/client/login' element={<ClientLogin />}/>
          <Route path='/business/login' element={<BusinessLogin />} />
          <Route path='/client/signin' element={<ClientSignin />} />
          <Route path='/business/signin' element={<BusinessSignin />} />
      </Routes>
    </Router>
  );
}

export default Routers;
