import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurantsThunk, fetchTablesThunk } from "./customerOrderThunk";
import { createOrderThunk } from "./customerOrderThunk";
import CONTROL_TYPE from "../../enums/controlType";
import RestaurantList from "../../components/RestaurantList";

const OrderCreator = () => {
  const { restaurants, tables, createOrderStatus } = useSelector(
    (state) => state.customerOrder
  );

  const dispatch = useDispatch();

  const getTableControls = (table) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Create Order",
        className: "btn-primary",
        onClick: () => {
          dispatch(createOrderThunk(table.id));
        },
        status: createOrderStatus,
      },
    ];
  };

  useEffect(() => {
    dispatch(fetchRestaurantsThunk());

    dispatch(fetchTablesThunk());
  }, [dispatch]);

  return (
    <RestaurantList
      restaurants={restaurants}
      tables={tables}
      getTableControls={getTableControls}
    />
  );
};

export default OrderCreator;
