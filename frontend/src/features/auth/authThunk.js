import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings";
import { HEADERS } from "../../constants/fetch";

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
