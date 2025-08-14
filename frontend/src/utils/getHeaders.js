import { HEADERS } from "../constants/fetch";

export const getAuthHeaders = (token) => {
  return {
    ...HEADERS,
    ...(token && { Authorization: `Token ${token}` }),
  };
};

export const getAuthHeader = (token) => {
  return {
    ...(token && { Authorization: `Token ${token}` }),
  };
};
