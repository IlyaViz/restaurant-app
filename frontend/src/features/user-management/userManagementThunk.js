import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  updateUserRole,
  searchUserByPartialUsername,
} from "../../api/userApi";
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
  "userManagement/updateRole",
  async ({ user, newRole }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const userWithUrlRole = {
        ...user,
        role: USER_ROLE_URL[user.role],
      };

      return await updateUserRole({ user: userWithUrlRole, newRole }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUserByPartialUsernameThunk = createAsyncThunk(
  "userManagement/searchUser",
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
