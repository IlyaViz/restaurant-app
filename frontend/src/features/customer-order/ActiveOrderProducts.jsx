import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeOrderProductThunk,
  fetchOrderProductsThunk,
  updateOrderProductStatusThunk,
} from "./customerOrderThunk";
import { showToast } from "../toast/toastSlice";
import { INACTIVE_ORDER_STATUSES, ORDER_STATUSES } from "../../constants/order";
import { FETCH_ORDER_PRODUCTS_INTERVAL } from "../../constants/time";
import OrderProducts from "../../components/OrderProducts";

const ActiveOrderProducts = () => {
  const { order, orderProducts, removeOrderProductStatus } = useSelector(
    (state) => state.customerOrder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (order) {
      dispatch(fetchOrderProductsThunk(order.id));
    }

    const interval = setInterval(() => {
      if (order) {
        dispatch(fetchOrderProductsThunk(order.id));
      }
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [order, dispatch]);

  useEffect(() => {
    if (removeOrderProductStatus.error) {
      dispatch(
        showToast({ message: removeOrderProductStatus.error, type: "error" })
      );
    }
  }, [removeOrderProductStatus.error, dispatch]);

  const isOrderProductRemovable = (orderProduct) => {
    return Object.keys(INACTIVE_ORDER_STATUSES).includes(orderProduct.status);
  };

  return (
    <OrderProducts
      orderProducts={orderProducts}
      allowedOrderProductStatuses={Object.keys(ORDER_STATUSES)}
      onOrderProductStatusChange={(orderProductId, status) =>
        dispatch(updateOrderProductStatusThunk({ orderProductId, status }))
      }
      isOrderProductRemovable={isOrderProductRemovable}
      onOrderProductRemoveClick={(orderProductId) =>
        dispatch(removeOrderProductThunk(orderProductId))
      }
      orderProductRemoveStatus={removeOrderProductStatus}
    />
  );
};

export default ActiveOrderProducts;
