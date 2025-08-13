import ORDER_STATUS from "../enums/order";

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.DRAFT]: "Draft",
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.IN_PROGRESS]: "In Progress",
  [ORDER_STATUS.COMPLETED]: "Completed",
  [ORDER_STATUS.PAID]: "Paid",
};

export const INACTIVE_ORDER_STATUSES = [
  ORDER_STATUS.DRAFT,
  ORDER_STATUS.PENDING,
];
