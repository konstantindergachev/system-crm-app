import PropTypes from 'prop-types';
import React from 'react';
import { HISTORY, MONEY } from '../../../constants';
import { moneyFormat } from '../../../helpers/moneyFormat';

import './HistoryItem.scss';

const HistoryItem = ({ id, orderNumber, date, time, orderTotalSum, handleHistoryModalOpen }) => {
  return (
    <tr>
      <td>{orderNumber}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{moneyFormat(MONEY.LOCALE, MONEY.CURRENCY, orderTotalSum)}</td>
      <td>
        <button
          className="btn btn-small modal-trigger grey darken-1"
          data-target="order-list"
          onClick={() => handleHistoryModalOpen(id)}
        >
          <i className="material-icons">{HISTORY.BTN_OPEN_IN_NEW}</i>
        </button>
      </td>
    </tr>
  );
};

HistoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  orderNumber: PropTypes.number,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  orderTotalSum: PropTypes.number.isRequired,
  handleHistoryModalOpen: PropTypes.func.isRequired,
};

export default HistoryItem;
