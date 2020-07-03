import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAnatytics } from '../../redux/actions/analyticsActions';
import Content from '../content/Content';
import FloatingButton from '../floating-button/FloatingButton';
import Sidebar from '../sidebar/Sidebar';
import Spinner from '../ui/spinner/Spinner';
import './Analytics.scss';

class Analytics extends Component {
  componentDidMount() {
    const { getAnatytics } = this.props;
    const token = localStorage.getItem('jwtToken');
    getAnatytics(token);
  }
  render() {
    const {
      isAuth,
      username,
      logOutClick,
      isLoading,
      average,
      gainConfig,
      orderConfig,
    } = this.props;
    return (
      <Fragment>
        <Sidebar
          isAuth={isAuth}
          username={username}
          logOutClick={logOutClick}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <Content
            isLoading={isLoading}
            average={average}
            gainConfig={gainConfig}
            orderConfig={orderConfig}
          />
        )}
        <FloatingButton />
      </Fragment>
    );
  }
}

Analytics.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  average: PropTypes.number,
  getAnatytics: PropTypes.func.isRequired,
  gainConfig: PropTypes.object.isRequired,
  orderConfig: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.analytics.isLoading,
  average: state.analytics.analytics.average,
  gainConfig: state.analytics.gainConfig,
  orderConfig: state.analytics.orderConfig,
});

export default connect(mapStateToProps, { getAnatytics })(Analytics);
