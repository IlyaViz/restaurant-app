import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerActiveOrdersThunk,
  fetchCustomerOrderProductsThunk,
} from "./kitchenThunk";
import {
  FETCH_ORDERS_INTERVAL,
  FETCH_ORDER_PRODUCTS_INTERVAL,
} from "../../constants/time";
import Button from "../../components/Button";

const KitchenOrders = () => {
  const { customerOrders } = useSelector((state) => state.kitchen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerActiveOrdersThunk());

    const interval = setInterval(() => {
      dispatch(fetchCustomerActiveOrdersThunk());
    }, FETCH_ORDERS_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      customerOrders.forEach((customerOrder) => {
        dispatch(fetchCustomerOrderProductsThunk(customerOrder.id));
      });
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      {customerOrders.map((customerOrder) => (
        <div key={customerOrder.id}>
          <h3>Order ID: {customerOrder.id}</h3>
          <Button
            onClick={() => dispatch(deleteCustomerOrder(customerOrder.id))}
          >
            Delete Order
          </Button>
        </div>
      ))}
    </div>
  );
};

export default KitchenOrders;
