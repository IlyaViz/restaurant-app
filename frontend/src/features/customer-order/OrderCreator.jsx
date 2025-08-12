import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurantsThunk,
  fetchRestaurantTablesThunk,
} from "../restaurant/restaurantThunk";
import { showToast } from "../toast/toastSlice";
import { createOrderThunk } from "./customerOrderThunk";
import Button from "../../components/Button";

const OrderCreator = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const { restaurants, restaurantTables } = useSelector(
    (state) => state.restaurant
  );
  const { createOrderStatus } = useSelector((state) => state.customerOrder);

  const dispatch = useDispatch();

  const handleRestaurantChange = (e) => {
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

  useEffect(() => {
    if (createOrderStatus.error) {
      dispatch(showToast({ message: createOrderStatus.error, type: "error" }));
    }
  }, [createOrderStatus.error, dispatch]);

  return (
    <div className="flex flex-col items-center">
      <select
        className="text-2xl text-center"
        onChange={(e) => handleRestaurantChange(e)}
      >
        <option value="">Select Restaurant</option>

        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>

      <select
        className="text-2xl text-center"
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option value="">Select Table</option>

        {restaurantTables.map((table) => (
          <option key={table.id} value={table.id}>
            {table.number}
          </option>
        ))}
      </select>

      <Button
        active={!!selectedTable}
        label="Create Order"
        onClick={() => dispatch(createOrderThunk(selectedTable))}
        className="btn-primary"
        loading={createOrderStatus.loading}
      />
    </div>
  );
};

export default OrderCreator;
