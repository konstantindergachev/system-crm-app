import { TYPES } from '../history-types';

const initialState = {
  historyOfOrders: [],
  oneHistroy: {},
  isLoading: false,
  errors: {},
  offset: 0,
  isComplete: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.HISTORY_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.GET_HISTORY_OF_ORDERS:
      const { data, offset, isComplete } = action.payload;
      return {
        ...state,
        historyOfOrders: data,
        offset: data.length === 0 ? 0 : offset,
        isLoading: false,
        isComplete: isComplete,
      };
    case TYPES.GET_ONE_HISTORY:
      return {
        ...state,
        oneHistroy: action.payload.data,
        isLoading: false,
      };
    case TYPES.ERROR_HISTORY:
      return {
        ...state,
        errors: action.payload.data,
        isLoading: false,
      };

    default:
      return state;
  }
}
