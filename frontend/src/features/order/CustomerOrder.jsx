import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActiveOrder } from "./orderSlice";
import { createOrder } from "./orderSlice";
import {
  fetchRestaurants,
  fetchRestaurantTables,
} from "../restaurant/restaurantSlice";
import Button from "../../components/Button";

const CustomerOrder = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const { customerOrder, createOrderStatus } = useSelector(
    (state) => state.order
  );
  const { restaurants, restaurantTables } = useSelector(
    (state) => state.restaurant
  );
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(fetchActiveOrder());
  }, [token, dispatch]);

  useEffect(() => {
    if (token && !customerOrder) {
      dispatch(fetchRestaurants());
    }
  }, [token, customerOrder, dispatch]);

  useEffect(() => {
    if (selectedRestaurant) {
      dispatch(fetchRestaurantTables(selectedRestaurant));
    }
  }, [selectedRestaurant, dispatch]);

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e.target.value);

    setSelectedTable(null);
  };

  const render = () => {
    if (!token) {
      return (
        <div className="text-center text-2xl">
          Please log in to create an order.
        </div>
      );
    }

    if (customerOrder) {
      return (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Active Order</h2>
          <p className="text-lg">Table: {customerOrder.table}</p>
        </div>
      );
    }

    if (restaurants.length > 0) {
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
            onClick={() => dispatch(createOrder(selectedTable))}
            className="btn-primary"
          />

          {createOrderStatus.loading && <div>Creating order...</div>}

          {createOrderStatus.error && (
            <div>Error creating order: {createOrderStatus.error}</div>
          )}
        </div>
      );
    }

    return <div className="text-center text-2xl">No restaurants available</div>;
  };

  return render();
};

export default CustomerOrder;
