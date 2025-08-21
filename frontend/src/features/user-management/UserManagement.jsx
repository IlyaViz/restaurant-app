import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsersThunk,
  updateUserRoleThunk,
  createUserProfileThunk,
  updateUserProfileThunk,
  searchUserByPartialUsernameThunk,
  fetchRestaurantsThunk,
} from "./userManagementThunk";
import { USER_ROLE_LABEL } from "../../constants/userRole";
import getLowerRoles from "../../utils/getLowerRoles";
import USER_ROLE from "../../enums/userRole";
import CONTROL_TYPE from "../../enums/controlType";
import SearchUser from "../../components/SearchUser";
import UserList from "../../components/UserList";

const UserManagement = () => {
  const { role } = useSelector((state) => state.auth);
  const {
    users,
    restaurants,
    searchUserByPartialUsernameStatus,
    updateUserRoleStatus,
    createUserProfileStatus,
    updateUserProfileStatus,
  } = useSelector((state) => state.userManagement);

  const dispatch = useDispatch();

  const getUsersByRole = (userRole) => {
    return users.filter((user) => user.role === userRole);
  };

  const getUserControls = (user) => {
    const generalControls = [
      {
        type: CONTROL_TYPE.SELECT,
        label: "Role",
        options: getLowerRoles(role).map((lowerRole) => ({
          value: lowerRole,
          label: lowerRole,
        })),
        selected: user.role,
        onChange: (e) => {
          dispatch(updateUserRoleThunk({ user, role: e.target.value }));
        },
        status: updateUserRoleStatus,
      },
    ];

    if (user.role === USER_ROLE.KITCHEN_STAFF) {
      const onChange = (e) => {
        if (user.profileInfo) {
          dispatch(
            updateUserProfileThunk({
              user,
              profileData: { restaurant: e.target.value },
            })
          );
        } else {
          dispatch(
            createUserProfileThunk({
              user,
              profileData: { restaurant: e.target.value, user: user.id },
            })
          );
        }
      };

      generalControls.push({
        type: CONTROL_TYPE.SELECT,
        label: "Restaurant",
        options: [{ value: "", label: "Select Restaurant" }].concat(
          restaurants.map((restaurant) => ({
            value: restaurant.id,
            label: restaurant.name,
          }))
        ),
        selected: user?.profileInfo?.restaurant || "",
        onChange,
        status: user?.profileInfo
          ? updateUserProfileStatus
          : createUserProfileStatus,
      });
    }

    return generalControls;
  };

  const onSearchChange = (e) => {
    dispatch(
      searchUserByPartialUsernameThunk({
        role: USER_ROLE.CUSTOMER,
        partialUsername: e.target.value,
      })
    );
  };

  useEffect(() => {
    getLowerRoles(role).forEach((lowerRole) => {
      dispatch(fetchUsersThunk(lowerRole));
    });
  }, [dispatch, role]);

  useEffect(() => {
    dispatch(fetchRestaurantsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col mt-4 gap-8">
        <div className="flex flex-col gap-4 bg-blue-100 rounded-xl p-4">
          <SearchUser
            label="Search customer"
            onChange={onSearchChange}
            status={searchUserByPartialUsernameStatus}
            users={getUsersByRole(USER_ROLE.CUSTOMER)}
            getUserControls={getUserControls}
          />
        </div>

        {[USER_ROLE.KITCHEN_STAFF, USER_ROLE.MANAGER, USER_ROLE.OWNER].map(
          (userRole) =>
            getUsersByRole(userRole).length > 0 && (
              <div
                key={userRole}
                className="flex flex-col gap-4 bg-blue-100 rounded-xl p-4"
              >
                <h1 className="text-xl font-bold">
                  {USER_ROLE_LABEL[userRole]}
                </h1>

                <hr />

                <UserList
                  users={getUsersByRole(userRole)}
                  getUserControls={getUserControls}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};

export default UserManagement;
