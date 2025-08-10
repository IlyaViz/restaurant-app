import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../api/authApi";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await login({ username, password });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      return await register({ username, email, password });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
