import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import Button from "../components/Button";

const Order = ({ order, actions }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (actions) {
      actions.forEach((action) => {
        if (action.status.error) {
          dispatch(
            showToast({
              type: "error",
              message: action.status.error,
            })
          );
        }
      });
    }
  }, [actions, dispatch]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Active Order</h2>

      <p className="text-lg">Table: {order.table}</p>

      {actions &&
        actions.map((action) => (
          <Button
            key={action.label}
            label={action.label}
            onClick={() => action.onClick(order.id)}
            className={action.buttonClassName}
            loading={action.status.loading}
          />
        ))}
    </div>
  );
};

export default Order;
