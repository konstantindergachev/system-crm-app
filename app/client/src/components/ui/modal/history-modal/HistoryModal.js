import PropTypes from 'prop-types';
import React from 'react';
import { getTotalSum } from '../../../../helpers/getTotalSum';
import HistoryModalItem from './history-modal-item/HistoryModalItem';
import { MODAL, MONEY } from '../../../../constants';
import { moneyFormat } from '../../../../helpers/moneyFormat';

import './HistoryModal.scss';

const modalStyle = {
  zIndex: '1003',
  display: 'block',
  width: '50%',
  opacity: '1',
  top: '10%',
  transform: 'scaleX(1) scaleY(1)',
};
const HistoryModal = ({ isHistoryModalOpen, selectedOrderList, handleCloseHistoryModal }) => {
  return (
    <div className={`modal__overlay ${isHistoryModalOpen && 'modal__overlay-open'}`}>
      <div className="modal modal-fixed-footer" style={isHistoryModalOpen ? modalStyle : null}>
        <div className="modal-content">
          <h4 className="mb1">
            {MODAL.HISTORY.TITLE}
            {selectedOrderList.order}
          </h4>
          <table className="highlight">
            <thead>
              <tr>
                <th>{MODAL.HISTORY.TABLE_TITLE}</th>
                <th>{MODAL.HISTORY.TABLE_COUNT}</th>
                <th>{MODAL.HISTORY.TABLE_PRICE}</th>
              </tr>
            </thead>
            {selectedOrderList.list.map((list) => (
              <HistoryModalItem
                key={list._id}
                name={list.name}
                quantity={list.quantity}
                cost={list.cost}
              />
            ))}
          </table>
          <div className="order-summary order-summary__total-cost">
            <p>
              {MODAL.HISTORY.SUMMARY}:{' '}
              <strong>
                {moneyFormat(MONEY.LOCALE, MONEY.CURRENCY, getTotalSum(selectedOrderList.list))}
              </strong>
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="modal-action waves-effect waves-black btn-flat"
            onClick={handleCloseHistoryModal}
          >
            {MODAL.HISTORY.BTN_CLOSE}
          </button>
        </div>
      </div>
    </div>
  );
};

HistoryModal.propTypes = {
  isHistoryModalOpen: PropTypes.bool.isRequired,
  selectedOrderList: PropTypes.object.isRequired,
  handleCloseHistoryModal: PropTypes.func.isRequired,
};

export default HistoryModal;
