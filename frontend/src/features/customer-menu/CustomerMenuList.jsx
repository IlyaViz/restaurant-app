import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk, fetchCategoriesThunk } from "./customerMenuThunk";
import { addOrderProductThunk } from "../customer-order/customerOrderThunk";
import CONTROL_TYPE from "../../enums/controlType";
import MenuList from "../../components/MenuList";

const CustomerMenuList = () => {
  const { order, addOrderProductStatus } = useSelector(
    (state) => state.customerOrder
  );
  const { products, categories, fetchProductsStatus, fetchCategoriesStatus } =
    useSelector((state) => state.customerMenu);

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

    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      {(fetchProductsStatus.loading || fetchCategoriesStatus.loading) && (
        <p className="text-gray-500">Loading products and categories...</p>
      )}

      {(fetchProductsStatus.error || fetchCategoriesStatus.error) && (
        <p className="text-red-500">Error loading products and categories</p>
      )}

      <MenuList
        products={products}
        categories={categories}
        getProductControls={getProductControls}
      />
    </>
  );
};

export default CustomerMenuList;
