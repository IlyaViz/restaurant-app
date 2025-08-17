import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersThunk,
  updateUserRoleThunk,
  updateUserProfileThunk,
  createUserProfileThunk,
  searchUserByPartialUsernameThunk,
  fetchRestaurantsThunk,
} from "./userManagementThunk";

const initialState = {
  users: [],
  restaurants: [],
  fetchUsersStatus: {
    loading: false,
    error: null,
  },
  updateUserRoleStatus: {
    loading: false,
    error: null,
  },
  createUserProfileStatus: {
    loading: false,
    error: null,
  },
  updateUserProfileStatus: {
    loading: false,
    error: null,
  },
  searchUserByPartialUsernameStatus: {
    loading: false,
    error: null,
  },
  fetchRestaurantsStatus: {
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

      .addCase(createUserProfileThunk.pending, (state) => {
        state.createUserProfileStatus.loading = true;
        state.createUserProfileStatus.error = null;
      })
      .addCase(createUserProfileThunk.fulfilled, (state, action) => {
        const { user: userId, ...profileData } = action.payload;

        const user = state.users.find((user) => user.id === userId);

        if (user) {
          user.profileInfo = profileData;
        }

        state.createUserProfileStatus.loading = false;
      })
      .addCase(createUserProfileThunk.rejected, (state, action) => {
        state.createUserProfileStatus.loading = false;
        state.createUserProfileStatus.error = action.payload;
      })

      .addCase(updateUserProfileThunk.pending, (state) => {
        state.updateUserProfileStatus.loading = true;
        state.updateUserProfileStatus.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        const { user: userId, ...profileData } = action.payload;

        const user = state.users.find((user) => user.id === userId);

        if (user) {
          user.profileInfo = profileData;
        }

        state.updateUserProfileStatus.loading = false;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.updateUserProfileStatus.loading = false;
        state.updateUserProfileStatus.error = action.payload;
      })

      .addCase(searchUserByPartialUsernameThunk.pending, (state) => {
        state.searchUserByPartialUsernameStatus.loading = true;
        state.searchUserByPartialUsernameStatus.error = null;
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

        state.searchUserByPartialUsernameStatus.loading = false;
      })
      .addCase(searchUserByPartialUsernameThunk.rejected, (state, action) => {
        state.searchUserByPartialUsernameStatus.loading = false;
        state.searchUserByPartialUsernameStatus.error = action.payload;
      })

      .addCase(fetchRestaurantsThunk.pending, (state) => {
        state.fetchRestaurantsStatus.loading = true;
        state.fetchRestaurantsStatus.error = null;
      })
      .addCase(fetchRestaurantsThunk.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.fetchRestaurantsStatus.loading = false;
      })
      .addCase(fetchRestaurantsThunk.rejected, (state, action) => {
        state.fetchRestaurantsStatus.loading = false;
        state.fetchRestaurantsStatus.error = action.payload;
      });
  },
});

export default userManagementSlice.reducer;
