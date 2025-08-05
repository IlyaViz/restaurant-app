import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings.js";
import { HEADERS } from "../../constants/fetch.js";

export const login = createAsyncThunk(
  "auth/login",

  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/account-management/obtain-token/`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: HEADERS,
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",

  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/account-management/register/`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
          headers: HEADERS,
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  username: null,
  token: null,
  loginLoading: false,
  registerLoading: false,
  loginError: null,
  registerError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.meta.arg.username;
        state.token = action.payload.token;
        state.loginLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      });
  },
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
