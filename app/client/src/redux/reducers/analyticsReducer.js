import { TYPES } from '../analytics-types';

const initialState = {
  overview: {},
  analytics: {},
  gainConfig: {},
  orderConfig: {},
  isLoading: false,
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.ANALYTICS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.GET_OVERVIEW:
      return {
        ...state,
        overview: action.payload.data,
        isLoading: false,
      };
    case TYPES.GET_ANALYTICS:
      const gainConfig = {
        label: 'Виторг',
        color: 'rgb(255,99,132)',
      };
      gainConfig.labels = action.payload.data.chart.map((item) => item.label);
      gainConfig.gains = action.payload.data.chart.map((item) => item.gain);
      const orderConfig = {
        label: 'Замовлення',
        color: 'rgb(54,162,235)',
      };
      orderConfig.labels = action.payload.data.chart.map((item) => item.label);
      orderConfig.orders = action.payload.data.chart.map((item) => item.order);
      return {
        ...state,
        gainConfig,
        orderConfig,
        analytics: action.payload.data,
        isLoading: false,
      };
    case TYPES.ERROR_OVERVIEW:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };
    case TYPES.ERROR_ANALYTICS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
