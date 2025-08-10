import { BACKEND_API_URL } from "../constants/settings";
import { HEADERS } from "../constants/fetch";
import fetchDefault from "../utils/fetchDefault";

export const fetchMenuItems = async () => {
  return await fetchDefault(`${BACKEND_API_URL}/menu-management/product/`, {
    headers: HEADERS,
  });
};
