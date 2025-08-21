import { BACKEND_API_URL } from "../constants/settings";
import { getAuthHeaders } from "../utils/getHeaders";
import fetchDefault from "../utils/fetchDefault";

export const fetchOrderProducts = async (orderId, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order/${orderId}/order-products/`,
    {
      headers: getAuthHeaders(token),
    }
  );
};

export const fetchActiveOrders = async (token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order/active-orders/`,
    {
      headers: getAuthHeaders(token),
    }
  );
};

export const fetchActiveOrder = async (token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order/active-order/`,
    {
      headers: getAuthHeaders(token),
    }
  );
};

export const fetchOrder = async (orderId, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order/${orderId}/`,
    {
      headers: getAuthHeaders(token),
    }
  );
};

export const updateOrderProductStatus = async (
  { orderProductId, status },
  token
) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order-product/${orderProductId}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ status }),
    }
  );
};

export const updateOrderParticipants = async (
  { orderId, participantIds },
  token
) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order/${orderId}/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ participants: participantIds }),
    }
  );
};

export const addOrderProduct = async ({ orderId, productId }, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order-product/`,
    {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ order: orderId, product: productId }),
    }
  );
};

export const removeOrderProduct = async (orderProductId, token) => {
  await fetchDefault(
    `${BACKEND_API_URL}/order-management/order-product/${orderProductId}/`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    }
  );

  return orderProductId;
};

export const deleteOrder = async (orderId, token) => {
  await fetchDefault(`${BACKEND_API_URL}/order-management/order/${orderId}/`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return orderId;
};

export const createOrder = async (tableId, token) => {
  return await fetchDefault(`${BACKEND_API_URL}/order-management/order/`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ table: tableId }),
  });
};

export const finishOrder = async (orderId, token) => {
  return await fetchDefault(
    `${BACKEND_API_URL}/order-management/order/${orderId}/finish-order/`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
    }
  );
};
