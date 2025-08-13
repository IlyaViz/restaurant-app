import {
  INACTIVE_ORDER_STATUSES,
  ORDER_STATUS_LABELS,
} from "../constants/order";

const getOrderProductStatusOptions = (
  orderProduct,
  allowAllStatuses = false
) => {
  const options = [];

  options.push({
    label: ORDER_STATUS_LABELS[orderProduct.status],
    value: orderProduct.status,
  });

  if (allowAllStatuses) {
    Object.keys(ORDER_STATUS_LABELS)
      .filter((status) => status !== orderProduct.status)
      .forEach((status) => {
        options.push({
          label: ORDER_STATUS_LABELS[status],
          value: status,
        });
      });
  } else if (INACTIVE_ORDER_STATUSES.includes(orderProduct.status)) {
    INACTIVE_ORDER_STATUSES.filter(
      (status) => status !== orderProduct.status
    ).forEach((status) => {
      options.push({
        label: ORDER_STATUS_LABELS[status],
        value: status,
      });
    });
  }

  return options;
};

export default getOrderProductStatusOptions;
