import { BACKEND_API_URL } from "../constants/settings";
import { HEADERS } from "../constants/fetch";
import { getAuthHeader, getAuthHeaders } from "../utils/getHeaders";
import fetchDefault from "../utils/fetchDefault";

export const fetchProducts = async () => {
  return await fetchDefault(`${BACKEND_API_URL}/menu-management/product/`, {
    headers: HEADERS,
  });
};

export const fetchCategories = async () => {
  return await fetchDefault(`${BACKEND_API_URL}/menu-management/category/`, {
    headers: HEADERS,
  });
};

export const updateProduct = async ({ productId, productFormData }, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/menu-management/product/${productId}/`,
    {
      method: "PATCH",
      headers: getAuthHeader(token),
      body: productFormData,
    }
  );
};

export const updateCategory = async ({ categoryId, categoryData }, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/menu-management/category/${categoryId}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(categoryData),
    }
  );
};

export const deleteProduct = async (productId, token) => {
  await fetchDefault(
    `${BACKEND_API_URL}/menu-management/product/${productId}/`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    }
  );

  return productId;
};

export const deleteCategory = async (categoryId, token) => {
  await fetchDefault(
    `${BACKEND_API_URL}/menu-management/category/${categoryId}/`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    }
  );

  return categoryId;
};

export const createProduct = async (productFormData, token) => {
  return await fetchDefault(`${BACKEND_API_URL}/menu-management/product/`, {
    method: "POST",
    headers: getAuthHeader(token),
    body: productFormData,
  });
};

export const createCategory = async (categoryData, token) => {
  return await fetchDefault(`${BACKEND_API_URL}/menu-management/category/`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(categoryData),
  });
};
