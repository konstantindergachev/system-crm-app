import { STEP } from '../../constants';
import { TYPES } from '../history-types';

export const historyLoading = () => {
  return {
    type: TYPES.HISTORY_LOADING,
  };
};

export const getHistoryOfOrders = (offset, limit, token, orders) => {
  return async (dispatch) => {
    try {
      dispatch(historyLoading());
      const response = await fetch(`/api/orders/order?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_HISTORY_OF_ORDERS,
        payload: {
          data: data !== orders && [...orders, ...data],
          offset,
          isComplete: data.length < STEP ? true : false,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_HISTORY,
        payload: err.message,
      });
    }
  };
};
export const getOneHistoryOfOrders = (token) => {
  return async (dispatch) => {
    try {
      dispatch(historyLoading());
      const response = await fetch('/api/categories/category/:id', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_ONE_HISTORY,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_HISTORY,
        payload: err.message,
      });
    }
  };
};
