import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { OFFSET, STEP } from '../../constants';
import { getHistoryOfOrders } from '../../redux/actions/historyActions';
import { getAllOrders } from '../../redux/actions/orderActions';
import Content from '../content/Content';
import FloatingButton from '../floating-button/FloatingButton';
import Sidebar from '../sidebar/Sidebar';
import HistoryModal from '../ui/modal/history-modal/HistoryModal';
import './History.scss';

class History extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      offset: 0,
      limit: STEP,
      orders: [],
      isHistoryModalOpen: false,
      selectedOrder: {},
      isFilteredOrders: false,
      isFilterOpen: false,
    };
  }
  componentDidMount() {
    const { getAllOrders } = this.props;
    const { offset, limit } = this.state;
    const token = localStorage.getItem('jwtToken');
    getAllOrders(offset, limit, token);
    this.setState({
      token: token,
    });
  }

  static getDerivedStateFromProps(props, prevState) {
    if (prevState.isFilteredOrders && !prevState.isFilterOpen && props.history.length === 0) {
      return {
        orders: props.history,
      };
    } else if (prevState.isFilterOpen && prevState.isFilteredOrders) {
      return {
        orders: props.orders,
      };
    } else if (prevState.isFilterOpen && !prevState.isFilteredOrders) {
      return {
        orders: props.history,
      };
    } else if (prevState.isFilteredOrders && !prevState.isFilterOpen) {
      return {
        orders: props.history,
      };
    } else if (props.orders.length === 1) {
      return {
        orders: props.orders,
      };
    } else if (props.orders.length === props.history.length) {
      return {
        orders: [...props.orders, ...props.history],
      };
    } else if (prevState.orders.length < props.history.length && !prevState.isFilteredOrders) {
      return {
        orders: props.history,
      };
    }
    return null;
  }

  handleHistoryModalOpen = (orderId) => {
    this.setState({
      isHistoryModalOpen: true,
      selectedOrder:
        this.props.orders.length >= this.state.orders.length
          ? this.props.orders.find((order) => order._id === orderId)
          : this.state.orders.find((order) => order._id === orderId),
    });
  };
  handleCloseHistoryModal = () => {
    this.setState({
      isHistoryModalOpen: false,
    });
  };
  handleSubmit = (ev, orderNumber, datePickerStart, datePickerEnd) => {
    ev.preventDefault();
    if (orderNumber || datePickerStart || datePickerEnd) {
      const { limit, token } = this.state;
      const { getAllOrders, orders } = this.props;
      const filter = {
        order: Number(orderNumber),
        start: datePickerStart.date,
        end: datePickerEnd.date,
      };
      this.setState(
        {
          offset: 0,
          orders,
          isFilteredOrders: true,
        },
        () => {
          getAllOrders(this.state.offset, limit, token, filter);
        }
      );
    } else {
      const { offset } = this.props;
      this.setState(
        (oldState) => ({
          offset: offset === 0 ? oldState.offset + OFFSET : offset + OFFSET,
        }),
        () => {
          const { offset, limit, token, orders } = this.state;
          const { getHistoryOfOrders } = this.props;
          getHistoryOfOrders(offset, limit, token, orders);
        }
      );
    }
  };

  openFilter = () => {
    this.setState((oldState) => ({
      isFilterOpen: !oldState.isFilterOpen,
    }));
  };

  render() {
    const {
      orders: ord,
      isHistoryModalOpen,
      selectedOrder,
      isFilteredOrders,
      isFilterOpen,
    } = this.state;
    const { isAuth, username, logOutClick, orders } = this.props;
    return (
      <Fragment>
        <Sidebar isAuth={isAuth} username={username} logOutClick={logOutClick} />

        <Content
          orders={ord.length === 0 ? orders : [...ord]}
          handleSubmit={this.handleSubmit}
          handleHistoryModalOpen={this.handleHistoryModalOpen}
          isFilteredOrders={isFilteredOrders}
          isFilterOpen={isFilterOpen}
          openFilter={this.openFilter}
          noOrders={orders.length === 0 && 'Замовлень поки немає'}
        />

        {isHistoryModalOpen && (
          <HistoryModal
            isHistoryModalOpen={isHistoryModalOpen}
            selectedOrderList={selectedOrder}
            handleCloseHistoryModal={this.handleCloseHistoryModal}
          />
        )}
        <FloatingButton />
      </Fragment>
    );
  }
}

History.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  orderId: PropTypes.string,
  orderNumber: PropTypes.number,
  datePickerStart: PropTypes.string,
  datePickerEnd: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  history: state.history.historyOfOrders,
  offset: state.history.offset,
});
export default connect(mapStateToProps, { getAllOrders, getHistoryOfOrders })(History);
