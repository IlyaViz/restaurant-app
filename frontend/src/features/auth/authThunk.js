import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../api/authApi";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      return await login(loginData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      return await register(registerData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
