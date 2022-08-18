import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

// 因 redux 不使用 useReducer 故 state 初始值直接以 ES6 預設值方式給值
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    // 因 redux 中的所有 reducers 都會接收同一個 action（只有一個 dispatch）
    // 若 action 與此 reducer 無關，default case 直接回傳原本的 state
    // 這個 reducer 就不會更新 state（記憶體位址仍相同）
    default:
      return state;
  }
};
