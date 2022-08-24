import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/user.slice';
import { cartReducer } from './cart/cart.slice';
import { categoriesReducer } from './categories/categories.slice';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  categories: categoriesReducer,
});

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
});

export const persistor = persistStore(store);