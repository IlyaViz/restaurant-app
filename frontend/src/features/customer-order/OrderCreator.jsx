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
    <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
      <div className="flex flex-col gap-4 bg-blue-100 p-4 rounded">
        <h1 className="text-2xl text-gray-900 font-semibold">
          Select a table to create order
        </h1>

        <RestaurantList
          restaurants={restaurants}
          tables={tables}
          getTableControls={getTableControls}
        />
      </div>

      <h1 className="text-xl text-gray-900 font-semibold">OR</h1>

      <div className="flex flex-col gap-2 bg-blue-100 rounded p-4">
        <h1 className="text-xl text-gray-900 font-semibold">
          Join an existing order
        </h1>

        <Input
          label="Order ID"
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
