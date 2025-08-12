import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerActiveOrdersThunk,
  fetchCustomerOrderProductsThunk,
  deleteCustomerOrderThunk,
  updateCustomerOrderProductStatusThunk,
  finishCustomerOrderThunk,
} from "./kitchenThunk";
import { FETCH_ORDERS_INTERVAL } from "../../constants/time";
import { ORDER_STATUS } from "../../constants/order";
import isOrderDeletable from "../../utils/isOrderDeletable";
import OrderDisplay from "../../components/OrderDisplay";

const KitchenOrders = () => {
  const {
    customerOrders,
    customerOrderProducts,
    deleteCustomerOrderStatus,
    finishCustomerOrderStatus,
  } = useSelector((state) => state.kitchen);

  const dispatch = useDispatch();

  const getCustomerOrderProducts = (customerOrder) => {
    return customerOrderProducts.filter(
      (orderProduct) => orderProduct.order === customerOrder.id
    );
  };

  const isCustomerOrderDeletable = (customerOrder) => {
    const orderProducts = getCustomerOrderProducts(customerOrder);

    return isOrderDeletable(orderProducts);
  };

  const isCustomerOrderFinishable = (customerOrder) => {
    const orderProducts = getCustomerOrderProducts(customerOrder);

    if (orderProducts.length === 0) {
      return false;
    }

    return orderProducts.every(
      (orderProduct) => orderProduct.status === ORDER_STATUS.PAID
    );
  };

  const getOrderActions = (customerOrder) => {
    const actions = [];

    if (isCustomerOrderDeletable(customerOrder)) {
      actions.push({
        label: "Delete Order",
        onClick: () => dispatch(deleteCustomerOrderThunk(customerOrder.id)),
        buttonClassName: "btn-danger",
        status: deleteCustomerOrderStatus,
      });
    }

    if (isCustomerOrderFinishable(customerOrder)) {
      actions.push({
        label: "Finish Order",
        onClick: () => dispatch(finishCustomerOrderThunk(customerOrder.id)),
        buttonClassName: "btn-success",
        status: finishCustomerOrderStatus,
      });
    }

    return actions;
  };

  useEffect(() => {
    dispatch(fetchCustomerActiveOrdersThunk());

    const interval = setInterval(() => {
      dispatch(fetchCustomerActiveOrdersThunk());
    }, FETCH_ORDERS_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    customerOrders.forEach((customerOrder) => {
      dispatch(fetchCustomerOrderProductsThunk(customerOrder.id));
    });
  }, [customerOrders, dispatch]);

  return (
    <>
      {customerOrders.map((customerOrder) => (
        <div key={customerOrder.id}>
          <OrderDisplay
            order={customerOrder}
            orderProducts={getCustomerOrderProducts(customerOrder)}
            orderActions={getOrderActions(customerOrder)}
            allowedOrderProductStatuses={Object.values(ORDER_STATUS)}
            onOrderProductStatusChange={(orderProductId, status) => {
              dispatch(
                updateCustomerOrderProductStatusThunk({
                  orderProductId,
                  status,
                })
              );
            }}
            isOrderProductRemovable={() => false}
          />
        </div>
      ))}
    </>
  );
};

export default KitchenOrders;
