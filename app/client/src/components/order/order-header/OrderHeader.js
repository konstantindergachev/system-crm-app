import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ORDER } from '../../../constants';

import './OrderHeader.scss';

const OrderHeader = ({ location, handleOpenOrderModal, btnOff }) => {
  return (
    <Fragment>
      <span className="page-title__left">
        <Link to="/order">
          <h4>{ORDER.TITLE}</h4>
        </Link>
        {location && (
          <Fragment>
            <i className="material-icons">{ORDER.BTN_KEYBOARD_ARROW_RIGHT}</i>
            <h4>{ORDER.SUB_TITLE}</h4>
          </Fragment>
        )}
      </span>

      <button
        className="waves-effect btn grey darken-1 modal-trigger"
        data-target="explore-order"
        onClick={handleOpenOrderModal}
        disabled={!btnOff}
      >
        {ORDER.BTN}
      </button>
    </Fragment>
  );
};

OrderHeader.propTypes = {
  location: PropTypes.object,
  handleOpenOrderModal: PropTypes.func.isRequired,
  btnOff: PropTypes.bool,
};

export default OrderHeader;
