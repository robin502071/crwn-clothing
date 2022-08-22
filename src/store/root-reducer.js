import { combineReducers } from 'redux';
import { userReducer } from '../store/user/user.reducer';
import { categoriesReducer } from '../store/categories/categories.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  // reducers: key and value
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
