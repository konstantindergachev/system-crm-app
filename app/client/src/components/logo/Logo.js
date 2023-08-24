import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../../img/sprite.svg';

import './Logo.scss';

const Logo = ({ isSidebar }) => {
  if (isSidebar) {
    return (
      <NavLink to="/" exact activeClassName="active" className="logo logo__sidebar">
        <svg aria-label="img" role="img">
          <use xlinkHref={`${image}#credit-card`} />
        </svg>
      </NavLink>
    );
  }
  return (
    <NavLink to="/" exact activeClassName="active" className="logo">
      <svg aria-label="img" role="img">
        <use xlinkHref={`${image}#credit-card`} />
      </svg>
    </NavLink>
  );
};

Logo.propTypes = {
  isSidebar: PropTypes.bool,
};

export default Logo;
