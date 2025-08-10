import { HEADERS } from "../constants/fetch";

const getAuthHeaders = (token) => {
  return {
    ...HEADERS,
    ...(token && { Authorization: `Token ${token}` }),
  };
};

export default getAuthHeaders;
