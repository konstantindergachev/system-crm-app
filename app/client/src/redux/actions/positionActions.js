import { TYPES } from '../position-types';

export const positionLoading = () => {
  return {
    type: TYPES.POSITIONS_LOADING,
  };
};

export const getPositionOfCategory = (categoryId, token) => {
  return async (dispatch) => {
    try {
      dispatch(positionLoading());
      const response = await fetch(`/api/positions/position/${categoryId}`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_POSITIONS,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_POSITIONS,
        payload: err.message,
      });
    }
  };
};

export const createPosition = (positionData, history, token) => {
  return async (dispatch) => {
    try {
      dispatch(positionLoading());
      const response = await fetch('/api/positions/position', {
        method: 'POST',
        body: JSON.stringify(positionData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.ADD_POSITION,
        payload: { positions: data.positions, position: data.position },
      });
      history.push('/categories');
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_POSITIONS,
        payload: err.message,
      });
    }
  };
};

export const updatePosition = (positionData, positionId, token) => {
  return async (dispatch) => {
    try {
      dispatch(positionLoading());
      const response = await fetch(`/api/positions/position/${positionId}`, {
        method: 'PATCH',
        body: JSON.stringify(positionData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.UPDATE_POSITION,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_POSITIONS,
        payload: err.message,
      });
    }
  };
};
export const deletePosition = (positionId, token) => {
  return async (dispatch) => {
    try {
      dispatch(positionLoading());
      const response = await fetch(`/api/positions/position/${positionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.DELETE_POSITION,
        payload: { msg: data.msg, deletedPositionId: data.deletedPositionId },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_POSITIONS,
        payload: err.message,
      });
    }
  };
};
