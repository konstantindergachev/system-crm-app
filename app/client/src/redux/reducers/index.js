import { combineReducers } from 'redux';
import analyticsReducer from './analyticsReducer';
import categoryReducer from './categoryReducer';
import historyReducer from './historyReducer';
import orderReducer from './orderReducer';
import positionReducer from './positionReducer';
import userReducer from './userReducer';

export default combineReducers({
  category: categoryReducer,
  analytics: analyticsReducer,
  position: positionReducer,
  order: orderReducer,
  user: userReducer,
  history: historyReducer,
});
