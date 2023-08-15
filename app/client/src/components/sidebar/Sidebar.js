import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../auth/logout/Logout';
import Logo from '../logo/Logo';
import './Sidebar.scss';

const sidebar = [
  {
    link: '/overview',
    name: 'Огляд',
  },
  {
    link: '/analytics',
    name: 'Аналітика',
  },
  {
    link: '/history',
    name: 'Історія',
  },
  {
    link: '/order',
    name: 'Додати замовлення',
  },
  {
    link: '/categories',
    name: 'Асортимент',
  },
];

const Sidebar = ({ isAuth, username, logOutClick }) => {
  return (
    <ul className="sidenav sidenav-fixed a-sidenav">
      <li className="bold first">
        <Logo isSidebar />
      </li>
      {sidebar.map((item) => (
        <li key={item.link} className="bold">
          <NavLink
            to={item.link}
            exact
            activeClassName="current"
            className="waves-effect waves-orange"
          >
            {item.name}
          </NavLink>
        </li>
      ))}
      <li className="bold last">
        {isAuth && <Logout isSidebar username={username} logOutClick={logOutClick} />}
      </li>
    </ul>
  );
};

Sidebar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
};

export default Sidebar;
