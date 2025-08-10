import { BACKEND_API_URL } from "../constants/settings";
import { HEADERS } from "../constants/fetch";
import fetchDefault from "../utils/fetchDefault";

export const login = async ({ username, password }) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/account-management/obtain-token/`,
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: HEADERS,
    }
  );
};

export const register = async ({ username, email, password }) => {
  return await fetchDefault(`${BACKEND_API_URL}/account-management/register/`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: HEADERS,
  });
};
