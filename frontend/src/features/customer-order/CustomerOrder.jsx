import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderProductsThunk,
  fetchActiveOrderThunk,
  deleteOrderThunk,
  removeOrderProductThunk,
  updateOrderProductStatusThunk,
} from "./customerOrderThunk";
import { INACTIVE_ORDER_STATUSES } from "../../constants/order";
import {
  FETCH_ORDER_INTERVAL,
  FETCH_ORDER_PRODUCTS_INTERVAL,
} from "../../constants/time";
import OrderDisplay from "../../components/OrderDisplay";
import OrderCreator from "./OrderCreator";
import isOrderDeletable from "../../utils/isOrderDeletable";

const CustomerOrder = () => {
  const { order, orderProducts, removeOrderProductStatus, deleteOrderStatus } =
    useSelector((state) => state.customerOrder);

  const dispatch = useDispatch();

  const isOrderProductRemovable = (orderProduct) => {
    return INACTIVE_ORDER_STATUSES.includes(orderProduct.status);
  };

  const getOrderActions = () => {
    const actions = [];

    if (isOrderDeletable(orderProducts)) {
      actions.push({
        label: "Delete Order",
        onClick: (orderId) => dispatch(deleteOrderThunk(orderId)),
        buttonClassName: "btn-danger",
        status: deleteOrderStatus,
      });
    }

    return actions;
  };

  useEffect(() => {
    dispatch(fetchActiveOrderThunk());

    const interval = setInterval(() => {
      dispatch(fetchActiveOrderThunk());
    }, FETCH_ORDER_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (!order) return;

    dispatch(fetchOrderProductsThunk(order.id));

    const interval = setInterval(() => {
      dispatch(fetchOrderProductsThunk(order.id));
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [order?.id, dispatch]);

  return (
    <>
      {order && orderProducts ? (
        <OrderDisplay
          order={order}
          orderProducts={orderProducts}
          orderActions={getOrderActions()}
          allowedOrderProductStatuses={INACTIVE_ORDER_STATUSES}
          onOrderProductStatusChange={(orderProductId, status) => {
            dispatch(updateOrderProductStatusThunk({ orderProductId, status }));
          }}
          isOrderProductRemovable={isOrderProductRemovable}
          onOrderProductRemoveClick={(orderProductId) =>
            dispatch(removeOrderProductThunk(orderProductId))
          }
          removeOrderProductStatus={removeOrderProductStatus}
        />
      ) : (
        <OrderCreator />
      )}
    </>
  );
};

export default CustomerOrder;
