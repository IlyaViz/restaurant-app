import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "./menuSlice";
import Product from "./Product";
import Button from "../../components/Button";

const MenuList = ({ onItemClick }) => {
  const { customerOrder } = useSelector((state) => state.order);
  const { menuItems, fetchMenuItemsStatus } = useSelector(
    (state) => state.menu
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center gap-8">
      {fetchMenuItemsStatus.loading && <div>Loading menu items...</div>}

      {fetchMenuItemsStatus.error && (
        <div>Error fetching menu items: {fetchMenuItemsStatus.error}</div>
      )}

      {menuItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-1">
          <Product {...item} />

          {customerOrder && (
            <Button
              label="Add to Order"
              className="btn-primary"
              onClick={() => onItemClick(item)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
