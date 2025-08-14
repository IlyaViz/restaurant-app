import { BACKEND_API_URL } from "../constants/settings";
import { getAuthHeaders } from "../utils/getHeaders";
import fetchDefault from "../utils/fetchDefault";

export const fetchRestaurants = () => {
  return fetchDefault(`${BACKEND_API_URL}/restaurant-management/restaurant/`, {
    headers: getAuthHeaders(),
  });
};

export const fetchRestaurantTables = (restaurantId) => {
  return fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/restaurant/${restaurantId}/tables/`,
    {
      headers: getAuthHeaders(),
    }
  );
};
