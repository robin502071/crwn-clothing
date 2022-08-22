import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';

// 在任何瀏覽器中這個 storage 預設為 local stoage
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 中介函式會在 reducers 接收到 action 時先觸發
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
