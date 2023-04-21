import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import AddUnit from './Units/AddUnit';
import ViewUnits from './Units/ViewUnits';
import Register from './Register';
import Login from './Login';
import ViewMyUnits from './Units/ViewMyUnits';
import Account from './Account';
import ViewAUnit from './Units/ViewAUnit';

const Main = () => {
  return (
    <Routes> 
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/add-unit' element={<AddUnit/>}></Route>
      <Route exact path='/view-units' element={<ViewUnits/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/my-units' element={<ViewMyUnits/>}></Route>
      <Route exact path='/account' element={<Account/>}></Route>
      <Route exact path='/view-a-unit/:id' element={<ViewAUnit/>}></Route>

    </Routes>
  );
}

export default Main;