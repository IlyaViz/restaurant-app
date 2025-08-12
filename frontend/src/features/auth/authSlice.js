import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authThunk";

const initialState = {
  username: null,
  role: null,
  token: null,
  loginStatus: {
    loading: false,
    error: null,
  },
  registerStatus: {
    loading: false,
    error: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.role = null;
    },
    clearErrors: (state) => {
      state.loginStatus.error = null;
      state.registerStatus.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginStatus.loading = true;
        state.loginStatus.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.loginStatus.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginStatus.loading = false;
        state.loginStatus.error = action.payload;
      })

      .addCase(registerThunk.pending, (state) => {
        state.registerStatus.loading = true;
        state.registerStatus.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.registerStatus.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.registerStatus.loading = false;
        state.registerStatus.error = action.payload;
      });
  },
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
