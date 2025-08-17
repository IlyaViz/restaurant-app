import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  updateUserRole,
  updateUserProfile,
  createUserProfile,
  searchUserByPartialUsername,
} from "../../api/userApi";
import { fetchRestaurants } from "../../api/restaurantApi";
import { USER_ROLE_URL } from "../../constants/userRole";

export const fetchUsersThunk = createAsyncThunk(
  "userManagement/fetch",
  async (userRole, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const userRoleUrl = USER_ROLE_URL[userRole];

      return await fetchUsers(userRoleUrl, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserRoleThunk = createAsyncThunk(
  "userManagement/update",
  async ({ user, role }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const userWithUrlRole = {
        ...user,
        role: USER_ROLE_URL[user.role],
      };

      return await updateUserRole({ user: userWithUrlRole, role }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUserProfileThunk = createAsyncThunk(
  "userManagement/createUserProfile",
  async ({ user, profileData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const userWithUrlRole = {
        ...user,
        role: USER_ROLE_URL[user.role],
      };

      return await createUserProfile(
        { user: userWithUrlRole, profileData },
        token
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  "userManagement/updateUserProfile",
  async ({ user, profileData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const userWithUrlRole = {
        ...user,
        role: USER_ROLE_URL[user.role],
      };

      return await updateUserProfile(
        { user: userWithUrlRole, profileData },
        token
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUserByPartialUsernameThunk = createAsyncThunk(
  "userManagement/searchUserByPartialUsername",
  async ({ role, partialUsername }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const userRoleUrl = USER_ROLE_URL[role];

      return await searchUserByPartialUsername(
        { role: userRoleUrl, partialUsername },
        token
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRestaurantsThunk = createAsyncThunk(
  "userManagement/fetchRestaurants",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchRestaurants(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
