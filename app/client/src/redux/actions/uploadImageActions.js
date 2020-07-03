import { TYPES } from '../category-types';

export const uploadCategoryImage = (imageData, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/categories/category/upload', {
        method: 'POST',
        body: imageData,
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.ADD_CATEGORY_IMAGE,
        payload: { imageId: data.imageId, info: data.msg },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err,
      });
    }
  };
};

export const removeCategoryImage = (imageId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/categories/category/removeimage`, {
        method: 'POST',
        body: JSON.stringify({ imageId }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: token,
        },
      });
      const data = await response.json();
      dispatch({
        type: TYPES.REMOVE_CATEGORY_IMAGE,
        payload: { imageId: 'liykshlziz1hucwrim3c', info: data.msg },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ERROR_CATEGORIES,
        payload: err,
      });
    }
  };
};
