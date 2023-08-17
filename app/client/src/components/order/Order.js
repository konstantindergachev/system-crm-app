import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions';
import Content from '../content/Content';
import FloatingButton from '../floating-button/FloatingButton';
import Sidebar from '../sidebar/Sidebar';

import './Order.scss';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      token: '',
    };
  }
  componentDidMount() {
    const { getAllCategories } = this.props;
    const token = localStorage.getItem('jwtToken');
    getAllCategories(token);
    this.setState({ token });
  }

  handleOpenOrderModal = () => {
    this.setState((oldState) => ({
      isModal: !oldState.isModal,
      orderId: '',
    }));
  };

  handleCloseOrderModal = () => {
    this.setState((oldState) => ({ isModal: !oldState.isModal }));
  };

  render() {
    const { isModal, token } = this.state;
    const { isAuth, username, logOutClick, isLoading, categories } = this.props;
    return (
      <Fragment>
        <Sidebar isAuth={isAuth} username={username} logOutClick={logOutClick} />
        <Content
          isLoading={isLoading}
          categories={categories}
          token={token}
          isModal={isModal}
          handleOpenOrderModal={this.handleOpenOrderModal}
          handleCloseOrderModal={this.handleCloseOrderModal}
        />
        <FloatingButton />
      </Fragment>
    );
  }
}

Order.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.category.isLoading,
  categories: state.category.categories,
  orders: state.order.orders,
});
export default connect(mapStateToProps, { getAllCategories })(Order);
