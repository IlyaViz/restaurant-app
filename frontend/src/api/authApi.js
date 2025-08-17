import { BACKEND_API_URL } from "../constants/settings";
import { HEADERS } from "../constants/fetch";
import fetchDefault from "../utils/fetchDefault";

export const login = async (loginData) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/account-management/obtain-token/`,
    {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: HEADERS,
    }
  );
};

export const register = async (registerData) => {
  return await fetchDefault(`${BACKEND_API_URL}/account-management/register/`, {
    method: "POST",
    body: JSON.stringify(registerData),
    headers: HEADERS,
  });
};
