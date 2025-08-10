import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import { ORDER_STATUSES } from "../constants/order";
import Product from "../features/menu/Product";
import Button from "./Button";

const OrderProducts = ({
  orderProducts,
  allowedOrderProductStatuses,
  onOrderProductStatusChange,
  isOrderProductRemovable,
  onOrderProductRemoveClick,
  orderProductRemoveStatus,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderProductRemoveStatus.error) {
      dispatch(
        showToast({ message: orderProductRemoveStatus.error, type: "error" })
      );
    }
  }, [orderProductRemoveStatus.error, dispatch]);

  return (
    <>
      {orderProducts.map((orderProduct) => (
        <div key={orderProduct.id} className="flex flex-col gap-2">
          <Product {...orderProduct.product} imageClassName="w-32" />

          <select
            className="text-center"
            onChange={(e) =>
              onOrderProductStatusChange(orderProduct.id, e.target.value)
            }
          >
            {!allowedOrderProductStatuses.includes(orderProduct.status) && (
              <option value="">{ORDER_STATUSES[orderProduct.status]}</option>
            )}

            {allowedOrderProductStatuses.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUSES[status]}
              </option>
            ))}
          </select>

          {isOrderProductRemovable(orderProduct) && (
            <Button
              label="Remove"
              onClick={() => onOrderProductRemoveClick(orderProduct.id)}
              className="btn-danger"
              loading={orderProductRemoveStatus.loading}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default OrderProducts;
