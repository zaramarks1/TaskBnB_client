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
import UpdateUnit from './Units/UpdateUnit';
import ViewAListing from './Listings/ViewAListing';
import ViewListings from './Listings/ViewListings';
import AddListing from './Listings/AddListing';
import UpdateListing from './Listings/UpdateListing';
import ViewMyRequests from './Requests/ViewMyRequests';
import ViewMyReservations from './Reservations/ViewMyReservations';

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
      <Route exact path='/view-a-unit/:id/update' element={<UpdateUnit/>}></Route>
      <Route exact path='/view-a-unit/:id/add-listing' element={<AddListing/>}></Route>
      <Route exact path='/view-listings' element={<ViewListings/>}></Route>
      <Route exact path='/view-a-listing/:id' element={<ViewAListing/>}></Route>
      <Route exact path='/view-a-listing/:id/update' element={<UpdateListing/>}></Route>
      <Route exact path='/my-requests' element={<ViewMyRequests/>}></Route>
      <Route exact path='/my-reservations' element={<ViewMyReservations/>}></Route>

    </Routes>
  );
}

export default Main;