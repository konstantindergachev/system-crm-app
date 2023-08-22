import React from 'react';
import { MONEY } from '../../../../../constants';
import { moneyFormat } from '../../../../../helpers/moneyFormat';

import './HistoryModalItem.scss';

const HistoryModalItem = ({ name, quantity, cost }) => {
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{moneyFormat(MONEY.LOCALE, MONEY.CURRENCY, cost)}</td>
      </tr>
    </tbody>
  );
};

export default HistoryModalItem;
