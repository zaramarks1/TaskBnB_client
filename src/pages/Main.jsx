import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import AddUnit from './AddUnit';
import ViewUnits from './ViewUnits';
import Register from './Register';
import Login from './Login';

const Main = () => {
  return (
    <Routes> 
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/addUnit' element={<AddUnit/>}></Route>
      <Route exact path='/viewUnits' element={<ViewUnits/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
    </Routes>
  );
}

export default Main;