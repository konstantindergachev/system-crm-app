import { isEmpty } from '../../validation/is-empty';
import { TYPES } from '../auth-types';

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  isAuthenticated: false,
  errors: {},
  info: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.REGISTER_USER:
      return {
        ...state,
        info: action.payload.info,
        isLoading: false,
      };
    case TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        isLoading: false,
      };
    case TYPES.ERRORS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
