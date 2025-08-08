import { HEADERS } from "../../constants/fetch";

const getAuthHeaders = (getState) => {
  const token = getState().auth.token;

  return {
    ...HEADERS,
    ...(token && { Authorization: `Token ${token}` }),
  };
};

export default getAuthHeaders;
