import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurantsThunk,
  fetchRestaurantTablesThunk,
} from "../restaurant/restaurantThunk";
import { createOrderThunk } from "./customerOrderThunk";
import Button from "../../components/Button";
import Select from "../../components/Select";

const OrderCreator = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const { restaurants, restaurantTables } = useSelector(
    (state) => state.restaurant
  );
  const { createOrderStatus } = useSelector((state) => state.customerOrder);

  const dispatch = useDispatch();

  const restaurantOptions = [
    { value: "", label: "Select Restaurant" },
    ...restaurants.map((restaurant) => ({
      value: restaurant.id,
      label: restaurant.name,
    })),
  ];

  const tableOptions = [
    { value: "", label: "Select Table" },
    ...restaurantTables.map((table) => ({
      value: table.id,
      label: table.number,
    })),
  ];

  const onRestaurantChange = (e) => {
    setSelectedRestaurant(e.target.value);

    setSelectedTable(null);
  };

  useEffect(() => {
    dispatch(fetchRestaurantsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedRestaurant) {
      dispatch(fetchRestaurantTablesThunk(selectedRestaurant));
    }
  }, [selectedRestaurant, dispatch]);

  return (
    <div className="flex flex-col items-center">
      <Select options={restaurantOptions} onChange={onRestaurantChange} />

      <Select
        options={tableOptions}
        onChange={(e) => setSelectedTable(e.target.value)}
      />

      <Button
        active={!!selectedTable}
        label="Create Order"
        onClick={() => dispatch(createOrderThunk(selectedTable))}
        className="btn-primary"
        status={createOrderStatus}
      />
    </div>
  );
};

export default OrderCreator;
