import { TYPES } from '../analytics-types';

export const analyticsLoading = () => {
  return {
    type: TYPES.ANALYTICS_LOADING,
  };
};

export const getOverview = (token) => {
  return async (dispatch) => {
    try {
      dispatch(analyticsLoading());
      const response = await fetch('/api/analytics/overview', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_OVERVIEW,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_OVERVIEW,
        payload: err.message,
      });
    }
  };
};

export const getAnatytics = (token) => {
  return async (dispatch) => {
    try {
      dispatch(analyticsLoading());
      const response = await fetch('/api/analytics/analytics', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_ANALYTICS,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_ANALYTICS,
        payload: err.message,
      });
    }
  };
};
