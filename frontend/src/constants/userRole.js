import USER_ROLE from "../enums/userRole";

export const USER_ROLE_URL = {
  [USER_ROLE.USER]: "user",
  [USER_ROLE.CUSTOMER]: "customer",
  [USER_ROLE.KITCHEN_STAFF]: "kitchen-staff",
  [USER_ROLE.MANAGER]: "manager",
  [USER_ROLE.OWNER]: "owner",
};

export const USER_ROLE_LABEL = {
  [USER_ROLE.USER]: "User",
  [USER_ROLE.CUSTOMER]: "Customer",
  [USER_ROLE.KITCHEN_STAFF]: "Kitchen Staff",
  [USER_ROLE.MANAGER]: "Manager",
  [USER_ROLE.OWNER]: "Owner",
};
