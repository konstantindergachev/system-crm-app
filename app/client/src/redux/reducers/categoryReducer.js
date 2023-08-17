import { TYPES } from '../category-types';

const initialState = {
  categories: [],
  category: {},
  isLoading: false,
  imageId: '',
  info: '',
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.data,
        isLoading: false,
      };
    case TYPES.GET_CATEGORY:
      return {
        ...state,
        category: action.payload.data,
        isLoading: false,
      };
    case TYPES.ADD_CATEGORY_IMAGE:
      return {
        ...state,
        imageId: action.payload.imageId,
        info: action.payload.info,
      };
    case TYPES.REMOVE_CATEGORY_IMAGE:
      return {
        ...state,
        imageId: action.payload.imageId,
        info: action.payload.info,
      };
    case TYPES.UPDATE_CATEGORY:
      return {
        ...state,
        isLoading: false,
      };
    case TYPES.DELETE_CATEGORY:
      return {
        ...state,
        category: action.payload.msg,
        isLoading: false,
      };
    case TYPES.ERROR_CATEGORIES:
      return {
        ...state,
        errors: action.payload.data,
        isLoading: false,
      };

    default:
      return state;
  }
}
