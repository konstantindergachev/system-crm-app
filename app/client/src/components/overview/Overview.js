import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getOverview } from '../../redux/actions/analyticsActions';
import Content from '../content/Content';
import FloatingButton from '../floating-button/FloatingButton';
import InformButton from '../inform-button/InformButton';
import Sidebar from '../sidebar/Sidebar';

import './Overview.scss';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTapTarget: false,
    };
  }
  componentDidMount() {
    const { getOverview } = this.props;
    const token = localStorage.getItem('jwtToken');
    getOverview(token);
  }
  handleInfo = () => {
    this.setState((oldState) => ({
      isTapTarget: !oldState.isTapTarget,
    }));
  };
  render() {
    const { isAuth, username, logOutClick, gain, orders, yesterday } = this.props;
    const { isTapTarget } = this.state;
    return (
      <Fragment>
        <Sidebar isAuth={isAuth} username={username} logOutClick={logOutClick} />
        <Content
          yesterday={yesterday}
          gain={gain}
          orders={orders}
          isTapTarget={isTapTarget}
          handleInfo={this.handleInfo}
        />
        <InformButton />
        <FloatingButton />
      </Fragment>
    );
  }
}

Overview.propTypes = {
  getOverview: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
  gain: PropTypes.object,
  orders: PropTypes.object,
  yesterday: PropTypes.string,
};

const mapStateToProps = (state) => ({
  gain: state.analytics.overview.gain,
  orders: state.analytics.overview.orders,
  yesterday: state.analytics.overview.yesterday,
});

export default connect(mapStateToProps, { getOverview })(Overview);
