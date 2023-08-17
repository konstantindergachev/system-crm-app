import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Content from '../../content/Content';
import Sidebar from '../../sidebar/Sidebar';

import './OrderForm.scss';

const OrderForm = ({ isAuth, username, logOutClick }) => {
  return (
    <Fragment>
      <Sidebar isAuth={isAuth} username={username} logOutClick={logOutClick} />
      <Content />
    </Fragment>
  );
};

OrderForm.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
};

export default OrderForm;
