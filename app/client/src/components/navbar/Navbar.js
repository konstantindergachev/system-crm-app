import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../auth/logout/Logout';
import Logo from '../logo/Logo';
import { NAVBAR } from '../../constants';

import './Navbar.scss';

const menu = [
  { id: 1, name: 'login' },
  { id: '2', name: 'registration' },
];

const Navbar = ({ isAuth, username, logOutClick }) => {
  return (
    <nav className="nav">
      <div className="nav-wrapper grey darken-1">
        <Logo />
        <ul id="nav-mobile" className="right">
          {isAuth ? (
            <Logout logOutClick={logOutClick} username={username} />
          ) : (
            menu.map((item) => (
              <li key={item.id} className="menu__item">
                <NavLink to={`/${item.name}`} exact activeClassName="current">
                  {item.name === 'login'
                    ? NAVBAR.LOGIN
                    : item.name === 'registration' && NAVBAR.REGISTRATION}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  username: PropTypes.string,
  logOutClick: PropTypes.func,
};

export default Navbar;
