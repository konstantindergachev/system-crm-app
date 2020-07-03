import { getTotalSum } from '../../helpers/getTotalSum';
import { TYPES } from '../order-types';

const initialState = {
  orders: [],
  order: {},
  totalSum: 0,
  isLoading: false,
  msg: '',
  errors: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.ORDERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.GET_ORDERS:
      const { data, totalSum } = action.payload;
      return {
        ...state,
        orders: data,
        totalSum,
        isLoading: false,
      };
    case TYPES.GET_ORDER:
      return {
        ...state,
        order: action.payload.data,
        isLoading: false,
      };
    case TYPES.ADD_ORDER:
      return {
        ...state,
        orders: action.payload.orders,
        msg: action.payload.msg,
        isLoading: false,
      };
    case TYPES.FORM_THE_ORDER:
      const list = state.orders;
      const candidate = list.find(
        (position) => position._id === action.payload.order._id
      );
      if (candidate) {
        candidate.quantity += action.payload.order.quantity;
        candidate.cost += action.payload.order.cost;
      } else {
        list.push(action.payload.order);
      }
      return {
        ...state,
        orders: list,
        order: action.payload.order,
        totalSum: getTotalSum(list),
        isLoading: false,
      };
    case TYPES.REMOVE_POSITION_FROM_ORDER:
      const updOrders = state.orders.filter(
        (position) => position._id !== action.payload.positionId
      );
      return {
        ...state,
        orders: updOrders,
        order: action.payload.order,
        totalSum: getTotalSum(updOrders),
        isLoading: false,
      };
    case TYPES.UPDATE_ORDER:
      const order = state.orders.map(
        (order) =>
          order._id === action.payload.data._id ? action.payload.data : order
      );
      return {
        ...state,
        order: order[0],
        orders: order,
        isLoading: false,
      };
    case TYPES.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id !== action.payload.deletedOrderId
        ),
        msg: action.payload.msg,
        isLoading: false,
      };
    case TYPES.ERROR_ORDERS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
