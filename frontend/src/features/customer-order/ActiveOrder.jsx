import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrderThunk, fetchActiveOrderThunk } from "./customerOrderThunk";
import { showToast } from "../toast/toastSlice";
import { INACTIVE_ORDER_STATUSES } from "../../constants/order";
import Order from "../../components/Order";

const ActiveOrder = () => {
  const { order, orderProducts, deleteOrderStatus } = useSelector(
    (state) => state.customerOrder
  );
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const isOrderDeletable = !orderProducts.some(
    (orderProduct) =>
      !Object.keys(INACTIVE_ORDER_STATUSES).includes(orderProduct.status)
  );

  useEffect(() => {
    if (token) dispatch(fetchActiveOrderThunk());
  }, [token, dispatch]);

  return (
    <>
      {order ? (
        <Order
          order={order}
          isDeletable={isOrderDeletable}
          deleteStatus={deleteOrderStatus}
          onDeleteClick={() => dispatch(deleteOrderThunk(order.id))}
        />
      ) : (
        <div className="text-center">No active order</div>
      )}
    </>
  );
};

export default ActiveOrder;
