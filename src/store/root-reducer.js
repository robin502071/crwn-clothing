import { combineReducers } from 'redux';
import { userReducer } from '../store/user/user.reducer';
export const rootReducer = combineReducers({
  // reducers: key and value
  user: userReducer,
});
