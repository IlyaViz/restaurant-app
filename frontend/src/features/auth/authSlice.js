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
  role: null,
  token: null,
  login: {
    loading: false,
    error: null,
  },
  register: {
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
      state.login.error = null;
      state.register.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.meta.arg.username;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.login.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
      });
  },
});

export const { logout, clearErrors } = authSlice.actions;
export default authSlice.reducer;
