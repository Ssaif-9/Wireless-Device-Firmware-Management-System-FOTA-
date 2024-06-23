import React from 'react';
import Login from './LoginPage';
import Signup from './SignupPage';
import Verification from './user/Verification';
import ForgetPassword from './user/forgetPaswword';
import ResetPassword from './user/resetPassword';
import UserHome from './user/home';
import OwnedCars from './user/ownedCars';
import Profile from './user/profile';
import About from './user/about';
import NotFoundPage from './NotFoundPage';


import AdminHome from './admin/addNews';
import AddUpdate from './admin/addUpdate';
import AddMembers from './admin/addMembers';
import EditCars from './admin/editCars';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />

        {/* USER ROUTES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/home" element={<UserHome/>} />
        <Route path="/ownedCars" element={<OwnedCars/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />

        {/* ADMIN ROUTES */}
        <Route path="/adNews" element={<AdminHome />} />
        <Route path="/adUCar" element={<AddUpdate />} />
        <Route path="/adAMem" element={<AddMembers />} />
        <Route path="/adECar" element={<EditCars />} />

        {/* ADDITIONAL PAGES */}
        <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </BrowserRouter>
);

export default Router;
