import { BACKEND_API_URL } from "../constants/settings";
import { getAuthHeaders } from "../utils/getHeaders";
import { CUSTOMER_LIMIT } from "../constants/limit";
import fetchDefault from "../utils/fetchDefault";

export const fetchUsers = async (userRole, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/account-management/${userRole}`,
    {
      headers: getAuthHeaders(token),
    }
  );
};

export const updateUserRole = async ({ user, newRole }, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/account-management/${user.role}/${user.id}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ role: newRole }),
    }
  );
};

export const searchUserByPartialUsername = async (
  { role, partialUsername },
  token
) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/account-management/${role}?username__icontains=${partialUsername}&limit=${CUSTOMER_LIMIT}`,
    {
      headers: getAuthHeaders(token),
    }
  );
};
