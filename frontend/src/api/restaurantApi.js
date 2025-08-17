import { BACKEND_API_URL } from "../constants/settings";
import { getAuthHeaders } from "../utils/getHeaders";
import { HEADERS } from "../constants/fetch";
import fetchDefault from "../utils/fetchDefault";

export const fetchRestaurants = async () => {
  return await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/restaurant/`,
    {
      headers: HEADERS,
    }
  );
};

export const fetchRestaurantTables = async (restaurantId) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/restaurant/${restaurantId}/tables/`,
    {
      headers: HEADERS,
    }
  );
};

export const fetchTables = async () => {
  return await fetchDefault(`${BACKEND_API_URL}/restaurant-management/table/`, {
    headers: HEADERS,
  });
};

export const updateRestaurant = async (
  { restaurantId, restaurantData },
  token
) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/restaurant/${restaurantId}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(restaurantData),
    }
  );
};

export const updateTable = async ({ tableId, tableData }, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/table/${tableId}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(tableData),
    }
  );
};

export const deleteRestaurant = async (restaurantId, token) => {
  await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/restaurant/${restaurantId}/`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    }
  );

  return restaurantId;
};

export const deleteTable = async (tableId, token) => {
  await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/table/${tableId}/`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    }
  );

  return tableId;
};

export const createRestaurant = async (restaurantData, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/restaurant-management/restaurant/`,
    {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(restaurantData),
    }
  );
};

export const createTable = async (tableData, token) => {
  return await fetchDefault(`${BACKEND_API_URL}/restaurant-management/table/`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(tableData),
  });
};
