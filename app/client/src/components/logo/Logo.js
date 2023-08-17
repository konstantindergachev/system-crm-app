import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.scss';

const Logo = ({ isSidebar }) => {
  if (isSidebar) {
    return (
      <NavLink to="/" exact activeClassName="active" className="logo logo__sidebar">
        <span className="brand-logo" aria-label="img" role="img">
          &#128179;
        </span>
      </NavLink>
    );
  }
  return (
    <NavLink to="/" exact activeClassName="active" className="logo">
      <span aria-label="img" role="img">
        &#128179;
      </span>
    </NavLink>
  );
};

Logo.propTypes = {
  isSidebar: PropTypes.bool,
};

export default Logo;
