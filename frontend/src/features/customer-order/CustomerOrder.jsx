import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActiveOrderThunk, fetchOrderThunk } from "./customerOrderThunk";
import OrderOwn from "./OrderOwn";
import OrderParticipation from "./OrderParticipation";
import OrderCreator from "./OrderCreator";
import useStatusesToast from "../../hooks/useStatusesToast";

const CustomerOrder = () => {
  const { order, joinedOrderId, fetchOrderStatus } = useSelector(
    (state) => state.customerOrder
  );

  useStatusesToast([fetchOrderStatus]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveOrderThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!joinedOrderId) return;

    dispatch(fetchOrderThunk(joinedOrderId));
  }, [dispatch, joinedOrderId]);

  const render = () => {
    if (joinedOrderId && order) {
      return <OrderParticipation />;
    }

    if (!joinedOrderId && order) {
      return <OrderOwn />;
    }

    return <OrderCreator />;
  };

  return render();
};

export default CustomerOrder;
