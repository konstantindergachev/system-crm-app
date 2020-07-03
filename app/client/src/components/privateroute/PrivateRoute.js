import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component
            {...props}
            isAuth={rest.isAuth}
            username={rest.username}
            logOutClick={rest.logOutClick}
          />
        ) : (
          <Redirect to="/" />
        )}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string,
  logOutClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
