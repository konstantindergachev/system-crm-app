import jwtDecode from 'jwt-decode';
import 'materialize-css/dist/js/materialize.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import setAuthToken from './helpers/setAuthToken';
import './index.scss';
import { logoutUser, setUser } from './redux/actions/userActions';
import store from './store';

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login page
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
