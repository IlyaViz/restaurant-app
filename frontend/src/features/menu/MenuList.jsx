import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItemsThunk } from "./menuThunk";
import { addOrderProductThunk } from "../customer-order/customerOrderThunk";
import { showToast } from "../toast/toastSlice";
import Product from "./Product";
import Button from "../../components/Button";

const MenuList = () => {
  const { order, addOrderProductStatus } = useSelector(
    (state) => state.customerOrder
  );
  const { menuItems, fetchMenuItemsStatus } = useSelector(
    (state) => state.menu
  );

  const dispatch = useDispatch();

  const handleAddOrderProduct = (item) => {
    const orderProduct = {
      orderId: order.id,
      productId: item.id,
    };

    dispatch(addOrderProductThunk(orderProduct));
  };

  useEffect(() => {
    dispatch(fetchMenuItemsThunk());
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

  return (
    <>
      {fetchMenuItemsStatus.loading && <div>Loading menu items...</div>}

      {fetchMenuItemsStatus.error && (
        <div>Error fetching menu items: {fetchMenuItemsStatus.error}</div>
      )}

      {menuItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-1">
          <Product {...item} imageClassName="w-64" />

          {order && (
            <Button
              label="Add to Order"
              className="btn-primary"
              onClick={() => handleAddOrderProduct(item)}
              loading={addOrderProductStatus.loading}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MenuList;
