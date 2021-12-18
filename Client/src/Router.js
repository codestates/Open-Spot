import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Nav from './Components/Nav.js';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import Signin from './Pages/Signin.js';

function Routers () {
  return (
    <Router>
      <Nav />
        <Routes>
          <Route exact={true} path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signin' element={<Signin />}/>
        </Routes>
    </Router>
  );
}

export default Routers;
