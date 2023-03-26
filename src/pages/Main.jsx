import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import Index from '../index';
// import ViewUnits from '../pages/view_units';
import Home from './Home';
import Test2 from './Test2';
import AddUnit from './AddUnit';
import ViewUnits from './ViewUnits';

const Main = () => {
  return (
    <Routes> 
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/test2' element={<Test2/>}></Route>
      <Route exact path='/addUnit' element={<AddUnit/>}></Route>
      <Route exact path='/viewUnits' element={<ViewUnits/>}></Route>
    </Routes>
  );
}

export default Main;