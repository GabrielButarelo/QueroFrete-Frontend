import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global-styles.css';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} exact />
        <Route path='/forgot-password' element={<ForgotPassword />} exact />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);