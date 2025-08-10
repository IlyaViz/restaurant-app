import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createOrderThunk,
  removeOrderProductThunk,
  fetchActiveOrderThunk,
  fetchOrderProductsThunk,
  updateOrderProductStatusThunk,
  deleteOrderThunk,
} from "./customerOrderThunk";
import {
  fetchRestaurantsThunk,
  fetchRestaurantTablesThunk,
} from "../restaurant/restaurantThunk";
import { showToast } from "../toast/toastSlice";
import { ORDER_STATUSES, INACTIVE_ORDER_STATUSES } from "../../constants/order";
import { FETCH_ORDER_PRODUCTS_INTERVAL } from "../../constants/time";
import Button from "../../components/Button";
import Product from "../menu/Product";

const CustomerOrder = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const {
    order,
    createOrderStatus,
    orderProducts,
    deleteOrderStatus,
    removeOrderProductStatus,
  } = useSelector((state) => state.customerOrder);
  const { restaurants, restaurantTables } = useSelector(
    (state) => state.restaurant
  );
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const errors = [
    createOrderStatus.error,
    removeOrderProductStatus.error,
    deleteOrderStatus.error,
  ];

  useEffect(() => {
    if (token) dispatch(fetchActiveOrderThunk());
  }, [token, dispatch]);

  useEffect(() => {
    if (order) {
      dispatch(fetchOrderProductsThunk(order.id));
    }

    const interval = setInterval(() => {
      if (order) {
        dispatch(fetchOrderProductsThunk(order.id));
      }
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [order, dispatch]);

  useEffect(() => {
    if (token && !order) {
      dispatch(fetchRestaurantsThunk());
    }
  }, [token, order, dispatch]);

  useEffect(() => {
    if (selectedRestaurant) {
      dispatch(fetchRestaurantTablesThunk(selectedRestaurant));
    }
  }, [selectedRestaurant, dispatch]);

  useEffect(() => {
    errors.forEach((error) => {
      if (error) {
        dispatch(showToast({ message: error, type: "error" }));
      }
    });
  }, [errors, dispatch]);

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e.target.value);

    setSelectedTable(null);
  };

  const isOrderDeletable = () => {
    return !orderProducts.some(
      (orderProduct) =>
        !Object.keys(INACTIVE_ORDER_STATUSES).includes(orderProduct.status)
    );
  };

  const isOrderProductRemovable = (orderProduct) => {
    return Object.keys(INACTIVE_ORDER_STATUSES).includes(orderProduct.status);
  };

  const render = () => {
    if (!token) {
      return (
        <div className="text-center text-2xl">
          Please log in to create an order.
        </div>
      );
    }

    if (order) {
      return (
        <div className="bg-blue-100 p-4 rounded-2xl">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Active Order</h2>

            <p className="text-lg">Table: {order.table}</p>

            <Button
              label="Delete Order"
              onClick={() => dispatch(deleteOrderThunk(order.id))}
              className="btn-danger"
              active={isOrderDeletable()}
              loading={deleteOrderStatus.loading}
            />
          </div>

          <div className="grid gap-8 mt-8 grid-cols-6">
            {orderProducts.map((orderProduct) => (
              <div key={orderProduct.id} className="flex flex-col gap-2">
                <Product {...orderProduct.product} imageClassName="w-32" />

                <select
                  className="text-center"
                  onChange={(e) =>
                    dispatch(
                      updateOrderProductStatusThunk({
                        orderProductId: orderProduct.id,
                        status: e.target.value,
                      })
                    )
                  }
                >
                  {!Object.keys(INACTIVE_ORDER_STATUSES).includes(
                    orderProduct.status
                  ) && (
                    <option value="">
                      {ORDER_STATUSES[orderProduct.status]}
                    </option>
                  )}

                  {Object.keys(INACTIVE_ORDER_STATUSES).includes(
                    orderProduct.status
                  ) &&
                    Object.keys(INACTIVE_ORDER_STATUSES).map((status) => (
                      <option key={status} value={status}>
                        {INACTIVE_ORDER_STATUSES[status]}
                      </option>
                    ))}
                </select>

                <Button
                  label="Remove"
                  onClick={() =>
                    dispatch(removeOrderProductThunk(orderProduct.id))
                  }
                  className="btn-danger"
                  active={isOrderProductRemovable(orderProduct)}
                  loading={removeOrderProductStatus.loading}
                />
              </div>
            ))}
          </div>
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
            onClick={() => dispatch(createOrderThunk(selectedTable))}
            className="btn-primary"
            loading={createOrderStatus.loading}
          />
        </div>
      );
    }

    return <div className="text-center text-2xl">No restaurants available</div>;
  };

  return render();
};

export default CustomerOrder;
