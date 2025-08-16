import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersThunk,
  updateUserRoleThunk,
  searchUserByPartialUsernameThunk,
} from "./userManagementThunk";

const initialState = {
  users: [],
  fetchUsersStatus: {
    loading: false,
    error: null,
  },
  updateUserRoleStatus: {
    loading: false,
    error: null,
  },
  searchUserByPartialUsername: {
    loading: false,
    error: null,
  },
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.fetchUsersStatus.loading = true;
        state.fetchUsersStatus.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        const result = action.payload.results || action.payload;

        state.users = state.users.filter(
          (user) => !result.some((newUser) => newUser.id === user.id)
        );

        state.users = state.users.concat(result);

        state.fetchUsersStatus.loading = false;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.fetchUsersStatus.loading = false;
        state.fetchUsersStatus.error = action.payload;
      })
      .addCase(updateUserRoleThunk.pending, (state) => {
        state.updateUserRoleStatus.loading = true;
        state.updateUserRoleStatus.error = null;
      })

      .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
        const { id, role } = action.payload;

        const user = state.users.find((user) => user.id === id);

        if (user) {
          user.role = role;
        }

        state.updateUserRoleStatus.loading = false;
      })
      .addCase(updateUserRoleThunk.rejected, (state, action) => {
        state.updateUserRoleStatus.loading = false;
        state.updateUserRoleStatus.error = action.payload;
      })

      .addCase(searchUserByPartialUsernameThunk.pending, (state) => {
        state.searchUserByPartialUsername.loading = true;
        state.searchUserByPartialUsername.error = null;
      })
      .addCase(searchUserByPartialUsernameThunk.fulfilled, (state, action) => {
        const result = action.payload.results || action.payload;

        if (result.length === 0) {
          state.users = state.users.filter(
            (user) => user.role !== action.meta.arg.role
          );
        } else {
          state.users = state.users.filter(
            (user) => !result.some((newUser) => newUser.id === user.id)
          );

          state.users = state.users.concat(result);
        }

        state.searchUserByPartialUsername.loading = false;
      })
      .addCase(searchUserByPartialUsernameThunk.rejected, (state, action) => {
        state.searchUserByPartialUsername.loading = false;
        state.searchUserByPartialUsername.error = action.payload;
      });
  },
});

export default userManagementSlice.reducer;
