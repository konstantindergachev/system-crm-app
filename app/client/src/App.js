import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Analytics from './components/analytics/Analytics';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Categories from './components/categories/Categories';
import CategoryForm from './components/categories/category-form/CategoryForm';
import History from './components/history/History';
import Main from './components/main/Main';
import Order from './components/order/Order';
import OrderForm from './components/order/order-form/OrderForm';
import Overview from './components/overview/Overview';
import PageNotFound from './components/page-not-found/PageNotFound';
import PrivateRoute from './components/privateroute/PrivateRoute';
import { logoutUser } from './redux/actions/userActions';

import './App.scss';

class App extends React.Component {
  handleLogoutClick = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };
  render() {
    const { isAuth, name } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Main
                {...props}
                isAuth={isAuth}
                username={name}
                logOutClick={this.handleLogoutClick}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                isAuth={isAuth}
                username={name}
                logOutClick={this.handleLogoutClick}
              />
            )}
          />
          <Route
            exact
            path="/registration"
            render={(props) => (
              <Register
                {...props}
                isAuth={isAuth}
                username={name}
                logOutClick={this.handleLogoutClick}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/overview"
            component={Overview}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/analytics"
            component={Analytics}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/history"
            component={History}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/order"
            component={Order}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/order/:id"
            component={OrderForm}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/categories"
            component={Categories}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/categories/category/:id"
            component={CategoryForm}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <PrivateRoute
            exact
            path="/categories/new"
            component={CategoryForm}
            isAuth={isAuth}
            username={name}
            logOutClick={this.handleLogoutClick}
          />
          <Route render={(props) => <PageNotFound {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuthenticated,
  name: state.user.user.name,
});

export default connect(mapStateToProps, { logoutUser })(App);
