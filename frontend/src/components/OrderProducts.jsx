import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import { ORDER_STATUS_LABELS } from "../constants/order";
import Product from "../features/menu/Product";
import Button from "./Button";

const OrderProducts = ({
  orderProducts,
  allowedOrderProductStatuses,
  onOrderProductStatusChange,
  isOrderProductRemovable,
  onOrderProductRemoveClick,
  removeOrderProductStatus,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (removeOrderProductStatus?.error) {
      dispatch(
        showToast({ message: removeOrderProductStatus.error, type: "error" })
      );
    }
  }, [removeOrderProductStatus?.error, dispatch]);

  return (
    <div className="grid grid-cols-8 gap-8">
      {orderProducts.map((orderProduct) => (
        <div key={orderProduct.id} className="flex flex-col items-center">
          <Product {...orderProduct.product} imageClassName="w-36" />

          <select
            className="text-center"
            onChange={(e) =>
              onOrderProductStatusChange(orderProduct.id, e.target.value)
            }
          >
            <option value={orderProduct.status}>
              {ORDER_STATUS_LABELS[orderProduct.status]} (Current)
            </option>

            {allowedOrderProductStatuses.includes(orderProduct.status) &&
              allowedOrderProductStatuses
                .filter((status) => status !== orderProduct.status)
                .map((status) => (
                  <option key={status} value={status}>
                    {ORDER_STATUS_LABELS[status]}
                  </option>
                ))}
          </select>

          {isOrderProductRemovable(orderProduct) && (
            <Button
              label="Remove"
              onClick={() => onOrderProductRemoveClick(orderProduct.id)}
              className="btn-danger"
              loading={removeOrderProductStatus.loading}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderProducts;
