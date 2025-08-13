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
import CONTROL_TYPE from "../../enums/controlType";
import getOrderProductStatusOptions from "../../utils/getOrderProductStatusOptions";
import isOrderDeletable from "../../utils/isOrderDeletable";
import OrderDisplay from "../../components/OrderDisplay";
import OrderCreator from "./OrderCreator";

const CustomerOrder = () => {
  const {
    order,
    orderProducts,
    removeOrderProductStatus,
    deleteOrderStatus,
    updateOrderProductStatus,
  } = useSelector((state) => state.customerOrder);

  const dispatch = useDispatch();

  const orderControls = isOrderDeletable(orderProducts)
    ? [
        {
          type: CONTROL_TYPE.BUTTON,
          label: "Delete Order",
          onClick: () => dispatch(deleteOrderThunk(order.id)),
          buttonClassName: "btn-danger",
          status: deleteOrderStatus,
        },
      ]
    : [];

  const isOrderProductRemovable = (orderProduct) => {
    return INACTIVE_ORDER_STATUSES.includes(orderProduct.status);
  };

  const getOrderProductControls = (orderProduct) => {
    const controls = [];

    controls.push({
      type: CONTROL_TYPE.SELECT,
      label: "Change Status",
      options: getOrderProductStatusOptions(orderProduct),
      selected: orderProduct.status,
      status: updateOrderProductStatus,
      onChange: (e) =>
        dispatch(
          updateOrderProductStatusThunk({
            orderProductId: orderProduct.id,
            status: e.target.value,
          })
        ),
    });

    if (isOrderProductRemovable(orderProduct)) {
      controls.push({
        type: CONTROL_TYPE.BUTTON,
        label: "Remove",
        onClick: () => dispatch(removeOrderProductThunk(orderProduct.id)),
        buttonClassName: "btn-danger",
        status: removeOrderProductStatus,
      });
    }

    return controls;
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
          orderControls={orderControls}
          getOrderProductControls={getOrderProductControls}
        />
      ) : (
        <OrderCreator />
      )}
    </>
  );
};

export default CustomerOrder;
