import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('oscar-token');

const initialState = {
  isAuthenticated: !!token,
  loader: !!token,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state) {
      state.loader = true;
    },
    loginSuccess(state, action) {
      state.loader = false;
      state.isAuthenticated = !!action.payload.token
      localStorage.setItem('oscar-token', action.payload.token);
    },
    loginFailure(state) {
      state.loader = false;
      state.isAuthenticated = false;
    },
    signup(state) {
      state.loader = true;
    },
    signupSuccess(state, action) {
      state.loader = false;
    },
    signupFailure(state) {
      state.loader = false;
      state.isAuthenticated = false;
    },
  },
});

export const { login, loginSuccess, loginFailure, signup, signupSuccess, signupFailure } = authenticationSlice.actions;
export default authenticationSlice.reducer;
