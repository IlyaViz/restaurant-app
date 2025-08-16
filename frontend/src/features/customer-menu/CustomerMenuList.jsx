import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "./customerMenuThunk";
import { addOrderProductThunk } from "../customer-order/customerOrderThunk";
import CONTROL_TYPE from "../../enums/controlType";
import MenuList from "../../components/MenuList";

const CustomerMenuList = () => {
  const { order, addOrderProductStatus } = useSelector(
    (state) => state.customerOrder
  );
  const { products, fetchProductsStatus } = useSelector(
    (state) => state.customerMenu
  );

  const dispatch = useDispatch();

  const getProductControls = (product) => {
    return order
      ? [
          {
            type: CONTROL_TYPE.BUTTON,
            label: "Add to Order",
            className: "btn-primary",
            onClick: () =>
              dispatch(
                addOrderProductThunk({
                  orderId: order.id,
                  productId: product.id,
                })
              ),
            status: addOrderProductStatus,
          },
        ]
      : [];
  };

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  return (
    <>
      {fetchProductsStatus.loading && <div>Loading products...</div>}

      {fetchProductsStatus.error && (
        <div>Error fetching products: {fetchProductsStatus.error}</div>
      )}

      <MenuList products={products} getProductControls={getProductControls} />
    </>
  );
};

export default CustomerMenuList;
