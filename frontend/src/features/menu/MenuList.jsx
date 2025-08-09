import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "./menuSlice";
import { addOrderProduct } from "../order/orderSlice";
import { showToast } from "../toast/toastSlice";
import Product from "./Product";
import Button from "../../components/Button";

const MenuList = () => {
  const { customerOrder, addOrderProductStatus } = useSelector(
    (state) => state.order
  );
  const { menuItems, fetchMenuItemsStatus } = useSelector(
    (state) => state.menu
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (addOrderProductStatus.error) {
      dispatch(
        showToast({
          message: addOrderProductStatus.error,
          type: "error",
        })
      );
    }
  }, [addOrderProductStatus.error, dispatch]);

  const handleAddOrderProduct = (item) => {
    const orderProduct = {
      orderId: customerOrder.id,
      productId: item.id,
    };

    dispatch(addOrderProduct(orderProduct));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {fetchMenuItemsStatus.loading && <div>Loading menu items...</div>}

      {fetchMenuItemsStatus.error && (
        <div>Error fetching menu items: {fetchMenuItemsStatus.error}</div>
      )}

      {menuItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-1">
          <Product {...item} imageClassName="w-64" />

          {customerOrder && (
            <Button
              label="Add to Order"
              className="btn-primary"
              onClick={() => handleAddOrderProduct(item)}
              loading={addOrderProductStatus.loading}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
