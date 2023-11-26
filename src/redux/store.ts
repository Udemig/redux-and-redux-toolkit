import {combineReducers, legacy_createStore} from 'redux';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';

const store = legacy_createStore(
  combineReducers({
    cart: cartReducer,
    product: productReducer,
  }),
);

export default store;
