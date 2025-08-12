import { INACTIVE_ORDER_STATUSES } from "../constants/order";

const isOrderDeletable = (orderProducts) => {
  return !orderProducts.some(
    (orderProduct) => !INACTIVE_ORDER_STATUSES.includes(orderProduct.status)
  );
};

export default isOrderDeletable;
