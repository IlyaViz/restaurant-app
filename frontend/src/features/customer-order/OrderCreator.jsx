import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurantsThunk, fetchTablesThunk } from "./customerOrderThunk";
import { createOrderThunk } from "./customerOrderThunk";
import { joinOrder } from "./customerOrderSlice";
import CONTROL_TYPE from "../../enums/controlType";
import RestaurantList from "../../components/RestaurantList";
import Input from "../../components/Input";
import Button from "../../components/Button";

const OrderCreator = () => {
  const [orderId, setOrderId] = useState("");

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
    <div className="flex items-center justify-center gap-4">
      <div>
        <h1 className="text-xl">
          Select a table in restaurant to create order
        </h1>

        <RestaurantList
          restaurants={restaurants}
          tables={tables}
          getTableControls={getTableControls}
        />
      </div>

      <div>
        <h1 className="text-xl">Join an existing order</h1>

        <Input
          placeholder="Order id"
          onChange={(e) => setOrderId(parseInt(e.target.value))}
        />

        <Button
          label="Join order"
          onClick={() => dispatch(joinOrder(orderId))}
          className="btn-primary"
        />
      </div>
    </div>
  );
};

export default OrderCreator;
