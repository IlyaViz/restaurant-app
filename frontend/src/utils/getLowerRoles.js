import USER_ROLE from "../enums/userRole";

const getLowerRoles = (role) => {
  const roles = Object.values(USER_ROLE);

  const currentRoleIndex = roles.indexOf(role);

  return roles.slice(0, currentRoleIndex);
};

export default getLowerRoles;
