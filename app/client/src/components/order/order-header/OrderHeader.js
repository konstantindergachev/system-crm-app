import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './OrderHeader.scss';

const OrderHeader = ({ location, handleOpenOrderModal, btnOff }) => {
  return (
    <Fragment>
      <span className="page-title__left">
        <Link to="/order">
          <h4>Замовлення</h4>
        </Link>
        {location && (
          <Fragment>
            <i className="material-icons">keyboard_arrow_right</i>
            <h4>Додати продукцію</h4>
          </Fragment>
        )}
      </span>

      <button
        className="waves-effect btn grey darken-1 modal-trigger"
        data-target="explore-order"
        onClick={handleOpenOrderModal}
        disabled={!btnOff}
      >
        Закінчити
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
