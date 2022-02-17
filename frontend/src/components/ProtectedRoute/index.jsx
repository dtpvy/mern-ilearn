import { unwrapResult } from '@reduxjs/toolkit';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loading from 'components/Loading';
import { loadUser, logout } from 'features/Auth/AuthSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoute({ component }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  let oldY = 0;
  const [show, setShow] = useState('');

  const handleClick = (isLogin) => {
    if (!isLogin) {
      dispatch(logout());
    }
    navigate('/login');
  }

  const controlNavbar = () => {
    if (window.scrollY < oldY || window.scrollY <= 100) {
      setShow(true);
    } else {
      setShow(false);
    }
    oldY = window.scrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    }
  }, [])


  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(loadUser());
    const currentUser = unwrapResult(actionResult);

    setIsLogin(currentUser.isAuthenticated);
    setLoading(false);
  }, [dispatch]);


  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isLogin ? (
            <>
              <Header isLogin={isLogin} onClick={handleClick} show={show} />
              <div style={{ paddingTop: 64 }} >
                {component}
                <Footer />
              </div>
            </>
          ) : (
            <Navigate to="/login" />
          )}
        </>
      )
      }
    </>
  );
}

export default ProtectedRoute;