import { TYPES } from '../position-types';

const initialState = {
  positions: [],
  position: {},
  isLoading: false,
  msg: '',
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.POSITIONS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.GET_POSITIONS:
      return {
        ...state,
        positions: action.payload.data,
        isLoading: false,
      };
    case TYPES.GET_POSITION:
      return {
        ...state,
        position: action.payload.data,
        isLoading: false,
      };
    case TYPES.ADD_POSITION:
      return {
        ...state,
        positions: action.payload.positions,
        isLoading: false,
      };
    case TYPES.UPDATE_POSITION:
      const position = state.positions.map((position) =>
        position._id === action.payload.data._id ? action.payload.data : position
      );
      return {
        ...state,
        position: position[0],
        positions: position,
        isLoading: false,
      };
    case TYPES.DELETE_POSITION:
      return {
        ...state,
        positions: state.positions.filter(
          (position) => position._id !== action.payload.deletedPositionId
        ),
        msg: action.payload.msg,
        isLoading: false,
      };
    case TYPES.ERROR_POSITIONS:
      return {
        ...state,
        errors: action.payload.data,
        isLoading: false,
      };
    default:
      return state;
  }
}
