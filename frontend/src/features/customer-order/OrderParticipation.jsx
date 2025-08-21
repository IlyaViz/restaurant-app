import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderProductsThunk,
  removeOrderProductThunk,
  updateOrderProductStatusThunk,
  fetchOrderThunk,
} from "./customerOrderThunk";
import { INACTIVE_ORDER_STATUSES } from "../../constants/order";
import { FETCH_ORDER_PRODUCTS_INTERVAL } from "../../constants/time";
import CONTROL_TYPE from "../../enums/controlType";
import getOrderProductStatusOptions from "../../utils/getOrderProductStatusOptions";
import OrderDisplay from "../../components/OrderDisplay";

const OrderParticipation = () => {
  const {
    order,
    orderProducts,
    removeOrderProductStatus,
    updateOrderProductStatus,
  } = useSelector((state) => state.customerOrder);
  const { id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getOrderProductControls = (orderProduct) => {
    const controls = [];

    if (orderProduct.customer === id) {
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

      if (INACTIVE_ORDER_STATUSES.includes(orderProduct.status)) {
        controls.push({
          type: CONTROL_TYPE.BUTTON,
          label: "Remove",
          onClick: () => dispatch(removeOrderProductThunk(orderProduct.id)),
          className: "btn-danger",
          status: removeOrderProductStatus,
        });
      }
    }

    return controls;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchOrderThunk(order.id));
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [order.id, dispatch]);

  useEffect(() => {
    dispatch(fetchOrderProductsThunk(order.id));

    const interval = setInterval(() => {
      dispatch(fetchOrderProductsThunk(order.id));
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [order.id, dispatch]);

  return (
    <OrderDisplay
      order={order}
      orderProducts={orderProducts}
      getOrderProductControls={getOrderProductControls}
    />
  );
};

export default OrderParticipation;
