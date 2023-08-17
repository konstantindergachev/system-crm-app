import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { changeCountOfProduct } from '../../../helpers/changeCountOfProduct';
import { formTheOrder, removePositionFromOrder } from '../../../redux/actions/orderActions';
import { getPositionOfCategory } from '../../../redux/actions/positionActions';
import FloatingButton from '../../floating-button/FloatingButton';
import OrderModal from '../../ui/modal/order-modal/OrderModal';
import Table from '../../ui/table/Table';
import OrderHeader from '../order-header/OrderHeader';

import './OrderPosition.scss';

class OrderPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      number: 1,
      positionId: '',
      updPos: [],
      btnOff: false,
    };
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.list.length === 0) {
      return {
        btnOff: false,
      };
    } else {
      return {
        btnOff: true,
      };
    }
  }
  componentDidMount() {
    const {
      getPositionOfCategory,
      location: {
        state: { categoryId, token },
      },
    } = this.props;
    getPositionOfCategory(categoryId, token);
  }
  handleChange = (ev, id) => {
    this.setState(
      {
        [ev.target.name]: Number(ev.target.value),
        positionId: id,
      },
      () => {
        const { number } = this.state;
        const {
          positions: { positions },
        } = this.props;
        const updPositions = changeCountOfProduct(id, number, positions);
        this.setState({
          updPos: updPositions,
        });
      }
    );
  };
  handleAddPositionToOrder = (id, name, cost, quantity) => {
    const { formTheOrder } = this.props;
    const orderObj = { _id: id, name, cost: cost * quantity, quantity };
    formTheOrder(orderObj);
    this.setState({
      btnOff: true,
    });
  };
  handleRemovePositionFromOrder = (id) => {
    const { list, removePositionFromOrder } = this.props;
    removePositionFromOrder(list, id);
  };
  handleOpenOrderModal = () => {
    this.setState((oldState) => ({
      isModal: !oldState.isModal,
    }));
  };

  handleCloseOrderModal = () => {
    this.setState((oldState) => ({ isModal: !oldState.isModal }));
  };

  render() {
    const { isModal, number, positionId, updPos, btnOff } = this.state;
    const {
      list,
      location,
      positions: { positions },
      history,
    } = this.props;
    return (
      <Fragment>
        <div className="page-title">
          <OrderHeader
            location={location}
            handleOpenOrderModal={this.handleOpenOrderModal}
            btnOff={btnOff}
          />
        </div>

        <Table
          positions={updPos.length > 0 ? updPos : positions}
          orderQuantity={number}
          handleChange={this.handleChange}
          positionId={positionId}
          handleAddPositionToOrder={this.handleAddPositionToOrder}
          isModal={isModal}
        />

        <OrderModal
          list={list}
          orderQuantity={number}
          handleCloseOrderModal={this.handleCloseOrderModal}
          isModal={isModal}
          handleRemovePositionFromOrder={this.handleRemovePositionFromOrder}
          token={location.state.token}
          history={history}
        />
        <FloatingButton />
      </Fragment>
    );
  }
}

OrderPosition.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cost: PropTypes.number,
  quantity: PropTypes.number,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  categoryId: PropTypes.string,
  token: PropTypes.string,
  positions: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  getPositionOfCategory: PropTypes.func.isRequired,
  formTheOrder: PropTypes.func.isRequired,
  removePositionFromOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  positions: state.position,
  list: state.order.orders.filter((order) => !order.hasOwnProperty('order')),
});
export default connect(mapStateToProps, {
  getPositionOfCategory,
  formTheOrder,
  removePositionFromOrder,
})(OrderPosition);
