import { TYPES as TYP } from '../history-types';
import { TYPES } from '../order-types';

export const orderLoading = () => {
  return {
    type: TYPES.ORDERS_LOADING,
  };
};

export const getAllOrders = (offset, limit, token, filter) => {
  return async (dispatch) => {
    try {
      dispatch(orderLoading());
      const response = await fetch(
        filter && filter.order
          ? `/api/orders/order?order=${filter.order}&offset=${offset}&limit=${limit}`
          : filter && filter.start && filter.end
            ? `/api/orders/order?start=${filter.start}&end=${filter.end}&offset=${offset}`
            : `/api/orders/order?offset=${offset}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
          params: {
            offset: offset,
            limit: limit,
            filter: filter,
          },
        }
      );
      const data = await response.json();
      dispatch({
        type: TYPES.GET_ORDERS,
        payload: { data, totalSum: 0 },
      });
      dispatch({
        type: TYP.GET_HISTORY_OF_ORDERS,
        payload: { isComplete: false },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_ORDERS,
        payload: err.message,
      });
    }
  };
};

export const formTheOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: TYPES.FORM_THE_ORDER,
        payload: { order: orderData },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_ORDERS,
        payload: err.message,
      });
    }
  };
};
export const removePositionFromOrder = (orderData, positionId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: TYPES.REMOVE_POSITION_FROM_ORDER,
        payload: { order: orderData, positionId },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_ORDERS,
        payload: err.message,
      });
    }
  };
};

export const createOrder = (orderData, history, token) => {
  return async (dispatch) => {
    try {
      dispatch(orderLoading());
      const response = await fetch('/api/orders/order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.ADD_ORDER,
        payload: { msg: data.msg, orders: [] },
      });
      history.push('/order');
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_ORDERS,
        payload: err,
      });
    }
  };
};

export const updateOrder = (orderData, orderId, history, token) => {
  return async (dispatch) => {
    try {
      dispatch(orderLoading());
      const response = await fetch(`/api/orders/order/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.UPDATE_ORDER,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.UPDATE_ORDER,
        payload: err.message,
      });
    }
  };
};
export const deleteOrder = (orderId, token) => {
  return async (dispatch) => {
    try {
      dispatch(orderLoading());
      const response = await fetch(`/api/orders/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.DELETE_ORDER,
        payload: { msg: data.msg, deletedOrderId: data.deletedOrderId },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_ORDERS,
        payload: err.message,
      });
    }
  };
};
