import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import Button from "../components/Button";

const Order = ({ order, isDeletable, onDeleteClick, deleteStatus }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteStatus.error) {
      dispatch(showToast({ message: deleteStatus.error, type: "error" }));
    }
  }, [deleteStatus.error, dispatch]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Active Order</h2>

      <p className="text-lg">Table: {order.table}</p>

      {isDeletable && (
        <Button
          label="Delete Order"
          onClick={() => onDeleteClick()}
          className="btn-danger"
          loading={deleteStatus.loading}
        />
      )}
    </div>
  );
};

export default Order;
