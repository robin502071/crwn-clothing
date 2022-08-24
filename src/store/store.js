import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/user.slice';
import { cartReducer } from './cart/cart.slice';
import { categoriesReducer } from './categories/categories.slice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean);

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  },
  middleware: middleWares,
});
