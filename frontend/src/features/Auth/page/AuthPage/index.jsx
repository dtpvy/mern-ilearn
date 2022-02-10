import { unwrapResult } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_TOKEN_NAME } from 'app/constants';
import { login, register } from 'features/Auth/AuthSlice';
import ChangeButton from 'features/Auth/components/ChangeButton';
import LoginForm from 'features/Auth/components/LoginForm';
import RegisterForm from 'features/Auth/components/RegisterForm';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './AuthPage.scss';

AuthPage.propTypes = {
  authRoute: PropTypes.string
};

AuthPage.defaultProps = {
  authRoute: 'login'
}

function AuthPage({ authRoute }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const nextAuthRoute = authRoute === 'login' ? 'register' : 'login';

  if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    return (
      <Navigate to="/" />
    )
  }

  const handleSubmit = async (value) => {
    let actionResult;
    if (authRoute === 'register') {
      actionResult = await dispatch(register(value));
    } else {
      actionResult = await dispatch(login(value));
    }
    const { error, message } = unwrapResult(actionResult);
    if (error) {
      setMessage(message);
      console.log(message);
    } else {
      navigate('/');
    }
  }

  const handleChange = () => {
    navigate(`/${nextAuthRoute}`);
  }

  return (
    <div className="auth-page">
      <div className="auth-page__overlay">
        <div className="auth-page__form ">
          <div className="auth-page__header">
            <h3 className="auth-page__title">
              {authRoute === 'login' ? "LOG IN" : "REGISTER"}
            </h3>
            <div className="auth-page__btn-change">
              <ChangeButton onClick={handleChange} mode={nextAuthRoute} />
            </div>
          </div>

          {
            authRoute === 'login' ?
              <LoginForm onSubmit={handleSubmit} message={message} />
              : <RegisterForm onSubmit={handleSubmit} message={message} />
          }
        </div>
      </div>

    </div>
  );
}

export default AuthPage;