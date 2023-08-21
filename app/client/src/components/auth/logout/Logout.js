import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { LOGOUT } from '../../../constants';

import './Logout.scss';

const Logout = ({ isSidebar, username, logOutClick }) => {
  if (isSidebar) {
    return (
      <Fragment>
        <span className="logout__username-sidebar">{username}</span>
        <span className="logout__exit logout__exit-sidebar" onClick={logOutClick}>
          {LOGOUT.BTN}
        </span>
      </Fragment>
    );
  }
  return (
    <div className="logout">
      <span className="logout__username">{username}</span>
      <span className="logout__exit" onClick={logOutClick}>
        {LOGOUT.BTN}
      </span>
    </div>
  );
};

Logout.propTypes = {
  isSidebar: PropTypes.bool,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
};

export default withRouter(Logout);
