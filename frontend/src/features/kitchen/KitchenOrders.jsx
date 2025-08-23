import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerActiveOrdersThunk,
  fetchCustomerOrderProductsThunk,
  deleteCustomerOrderThunk,
  updateCustomerOrderProductStatusThunk,
  finishCustomerOrderThunk,
} from "./kitchenThunk";
import { FETCH_ORDERS_INTERVAL } from "../../constants/time";
import getOrderProductStatusOptions from "../../utils/getOrderProductStatusOptions";
import ORDER_STATUS from "../../enums/order";
import CONTROL_TYPE from "../../enums/controlType";
import isOrderDeletable from "../../utils/isOrderDeletable";
import OrderDisplay from "../../components/OrderDisplay";

const KitchenOrders = () => {
  const {
    customerOrders,
    customerOrderProducts,
    deleteCustomerOrderStatus,
    finishCustomerOrderStatus,
    updateCustomerOrderProductStatus,
  } = useSelector((state) => state.kitchen);

  const dispatch = useDispatch();

  const getCustomerOrderProducts = (customerOrder) => {
    return customerOrderProducts.filter(
      (orderProduct) => orderProduct.order === customerOrder.id
    );
  };

  const isCustomerOrderDeletable = (customerOrder) => {
    const orderProducts = getCustomerOrderProducts(customerOrder);

    return isOrderDeletable(orderProducts);
  };

  const isCustomerOrderFinishable = (customerOrder) => {
    const orderProducts = getCustomerOrderProducts(customerOrder);

    if (orderProducts.length === 0) {
      return false;
    }

    return orderProducts.every(
      (orderProduct) => orderProduct.status === ORDER_STATUS.PAID
    );
  };

  const getCustomerOrderControls = (customerOrder) => {
    const controls = [];

    if (isCustomerOrderDeletable(customerOrder)) {
      controls.push({
        type: CONTROL_TYPE.BUTTON,
        label: "Delete Order",
        onClick: () => dispatch(deleteCustomerOrderThunk(customerOrder.id)),
        className: "btn-danger",
        status: deleteCustomerOrderStatus,
      });
    }

    if (isCustomerOrderFinishable(customerOrder)) {
      controls.push({
        type: CONTROL_TYPE.BUTTON,
        label: "Finish Order",
        onClick: () => dispatch(finishCustomerOrderThunk(customerOrder.id)),
        className: "btn-success",
        status: finishCustomerOrderStatus,
      });
    }

    return controls;
  };

  const getCustomerOrderProductControls = (customerOrderProduct) => {
    return [
      {
        type: CONTROL_TYPE.SELECT,
        label: "Change Status",
        options: getOrderProductStatusOptions(customerOrderProduct, true),
        selected: customerOrderProduct.status,
        status: updateCustomerOrderProductStatus,
        onChange: (e) =>
          dispatch(
            updateCustomerOrderProductStatusThunk({
              orderProductId: customerOrderProduct.id,
              status: e.target.value,
            })
          ),
      },
    ];
  };

  useEffect(() => {
    dispatch(fetchCustomerActiveOrdersThunk());

    const interval = setInterval(() => {
      dispatch(fetchCustomerActiveOrdersThunk());
    }, FETCH_ORDERS_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    customerOrders.forEach((customerOrder) => {
      dispatch(fetchCustomerOrderProductsThunk(customerOrder.id));
    });
  }, [customerOrders, dispatch]);

  return (
    <div className="flex flex-col gap-4 items-center">
      {customerOrders.map((customerOrder) => (
        <OrderDisplay
          key={customerOrder.id}
          order={customerOrder}
          orderProducts={getCustomerOrderProducts(customerOrder)}
          orderControls={getCustomerOrderControls(customerOrder)}
          getOrderProductControls={getCustomerOrderProductControls}
        />
      ))}
    </div>
  );
};

export default KitchenOrders;
