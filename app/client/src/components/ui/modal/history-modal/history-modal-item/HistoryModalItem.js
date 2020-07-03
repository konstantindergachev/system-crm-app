import React from 'react';
import './HistoryModalItem.scss';

const HistoryModalItem = ({ name, quantity, cost }) => {
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{cost} грн.</td>
      </tr>
    </tbody>
  );
};

export default HistoryModalItem;
