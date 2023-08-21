import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createOrder, updateOrder } from '../../../../redux/actions/orderActions';
import Table from '../../table/Table';
import { MODAL } from '../../../../constants';

import './OrderModal.scss';

const modalStyle = {
  zIndex: '1003',
  display: 'block',
  width: '50%',
  opacity: '1',
  top: '10%',
  transform: 'scaleX(1) scaleY(1)',
};
class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowed: false,
      totalSum: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { createOrder, history, token, ordId, list } = this.props;
    if (ordId) {
      // updateOrder(orderData, ordId, history, token);
    } else {
      createOrder(list, history, token);
    }
  };
  render() {
    const { totalSum } = this.props;
    const { list, orderQuantity, handleCloseOrderModal, isModal, handleRemovePositionFromOrder } =
      this.props;
    return (
      <div className={`modal__overlay ${isModal && 'modal__overlay-open'}`}>
        <form className="modal" style={isModal ? modalStyle : null} onSubmit={this.handleSubmit}>
          <div className="modal-content">
            <h4 className="mb1">{MODAL.ORDER.TITLE}</h4>
            <Table
              positions={list}
              orderQuantity={orderQuantity}
              isModal={isModal}
              handleRemovePositionFromOrder={handleRemovePositionFromOrder}
            />
            <div className="order-summary">
              <p>
                {MODAL.ORDER.SUMMARY}: <strong>{totalSum} грн.</strong>
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-action waves-effect waves-black btn-flat"
              onClick={handleCloseOrderModal}
            >
              {MODAL.ORDER.BTN_CANCEL}
            </button>
            <button
              type="submit"
              className="modal-action btn waves-effect"
              disabled={totalSum === 0}
            >
              {MODAL.ORDER.BTN_OK}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

OrderModal.propTypes = {
  ordId: PropTypes.string,
  token: PropTypes.string,
  history: PropTypes.object,
  list: PropTypes.array,
  createOrder: PropTypes.func.isRequired,
  orderQuantity: PropTypes.number,
  handleCloseOrderModal: PropTypes.func.isRequired,
  isModal: PropTypes.bool.isRequired,
  handleRemovePositionFromOrder: PropTypes.func,
};

const mapStateToProps = (state) => ({
  errors: state.order,
  totalSum: state.order.totalSum,
});
export default connect(mapStateToProps, { createOrder, updateOrder })(OrderModal);
