import React, { useState } from 'react';
import { BiBookHeart, BiLogInCircle, BiNews, BiNotepad, BiUserCircle, BiHomeSmile } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import './Header.scss';
import LogoImg from 'assets/img/logo.png';

function Header(props) {
  const { isLogin, onClick, show } = props;
  let style = show;
  if (show === true) style = 'header--show';
  if (show === false) style = 'header--hide';

  return (
    <header>
      <div className={`header ${style}`}>
        <div className="container">
          <div className="header__content">
            <img height={60} width={60} src={LogoImg} />
            <ul className="header__list">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "header__link header__link--isActive" : "header__link"
                }
                to="/"
              >
                <BiHomeSmile className="header__icon" />
                Dashboard
              </NavLink>
              {isLogin &&
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__link header__link--isActive" : "header__link"
                    }
                    to="courses"
                  >
                    <BiBookHeart className="header__icon" />
                    Courses
                  </NavLink>
                </li>}

              {isLogin &&
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__link header__link--isActive" : "header__link"
                    }
                    to="posts"
                  >
                    <BiNews className="header__icon" />
                    Posts
                  </NavLink>
                </li>}

              {isLogin &&
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__link header__link--isActive" : "header__link"
                    }
                    to="notes"
                  >
                    <BiNotepad className="header__icon" />
                    Notes
                  </NavLink>
                </li>}

              {isLogin &&
                <li className="header__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "header__link header__link--isActive" : "header__link"
                    }
                    to="account"
                  >
                    <BiUserCircle className="header__icon" />
                    Account
                  </NavLink>
                </li>}

              {isLogin &&
                <li className="header__item">
                  <div
                    className="header__link"
                    onClick={() => onClick(false)}
                  >
                    <BiLogInCircle className="header__icon" />
                    Logout
                  </div>
                </li>}

              {!isLogin &&
                <li className="header__item">
                  <div
                    className="header__link"
                    onClick={() => onClick(true)}
                  >
                    <BiLogInCircle className="header__icon" />
                    Login
                  </div>
                </li>}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;