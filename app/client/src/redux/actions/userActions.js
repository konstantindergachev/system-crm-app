// import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../helpers/setAuthToken';
import { TYPES } from '../auth-types';

//Create an actioncreator register
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    const data = await response.json();
    dispatch({
      type: TYPES.REGISTER_USER,
      payload: { data, info: 'Ваша регистрация успешна.' },
    });
    if (data.hasOwnProperty('role')) {
      history.push('/login');
    }
  } catch (err) {
    dispatch({
      type: TYPES.ERRORS,
      payload: err,
    });
  }
};

//Create a actioncreator login
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    const data = await response.json();
    if (data.hasOwnProperty('token')) {
      //Save to localStorage
      const { token } = data;
      //Set token to localStorage
      localStorage.setItem('jwtToken', token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get admin data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setUser(decoded));
      history.push('/overview');
    } else {
      dispatch({
        type: TYPES.ERRORS,
        payload: data,
      });
    }
  } catch (err) {
    dispatch({
      type: TYPES.ERRORS,
      payload: err,
    });
  }
};
//Set logged in user
export const setUser = (decoded) => {
  return {
    type: TYPES.SET_USER,
    payload: decoded,
  };
};

//Log out customer
export const logoutUser = () => (dispatch) => {
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false); //false that hit the else block
  //Set current customer to {} which will set isauthenticated to false
  dispatch(setUser({}));
};
