import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './redux/reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducers, initialState, compose(applyMiddleware(...middleware)));

export default store;
