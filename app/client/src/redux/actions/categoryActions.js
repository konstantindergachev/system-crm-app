import { TYPES } from '../category-types';

export const categoryLoading = () => {
  return {
    type: TYPES.CATEGORIES_LOADING,
  };
};

export const getAllCategories = (token) => {
  return async (dispatch) => {
    try {
      dispatch(categoryLoading());
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_CATEGORIES,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err.message,
      });
    }
  };
};
export const getOneCategory = (token) => {
  return async (dispatch) => {
    try {
      dispatch(categoryLoading());
      const response = await fetch('/api/categories/category/:id', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.GET_CATEGORY,
        payload: { data },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err.message,
      });
    }
  };
};

export const createCategory = (categoryData, history, token) => {
  return async (dispatch) => {
    try {
      dispatch(categoryLoading());
      const response = await fetch('/api/categories/category', {
        method: 'POST',
        body: JSON.stringify(categoryData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.ADD_CATEGORY,
        payload: data,
      });
      history.push('/categories');
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err.message,
      });
    }
  };
};

export const updateCategory = (categoryData, categoryId, history, token) => {
  return async (dispatch) => {
    try {
      dispatch(categoryLoading());
      const response = await fetch(`/api/categories/category/${categoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(categoryData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.UPDATE_CATEGORY,
        payload: data,
      });
      history.push('/categories');
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err.message,
      });
    }
  };
};
export const deleteCategory = (categoryId, imageId, history, token) => {
  return async (dispatch) => {
    try {
      dispatch(categoryLoading());
      const response = await fetch(`/api/categories/category/${categoryId}`, {
        method: 'DELETE',
        body: JSON.stringify({ imageId }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.DELETE_CATEGORY,
        payload: data,
      });
      history.push('/categories');
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err.message,
      });
    }
  };
};
