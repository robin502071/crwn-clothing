import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  number: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { payload } = action;
      state.currentUser = payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
