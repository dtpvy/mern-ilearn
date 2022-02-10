import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthPage from './page/AuthPage';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner'
Auth.propTypes = {

};

function Auth(props) {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AuthPage authRoute='login' />} />
        <Route path='/register' element={<AuthPage authRoute='register' />} />
        <Route path='/' element={<Navigate to="login" />} />
      </Routes>
    </div>
  );
}

export default Auth;