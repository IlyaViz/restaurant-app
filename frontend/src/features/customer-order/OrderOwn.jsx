import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderProductsThunk,
  fetchParticipantsThunk,
  deleteOrderThunk,
  removeOrderProductThunk,
  updateOrderProductStatusThunk,
  updateOrderParticipantsThunk,
  searchPossibleParticipantsThunk,
} from "./customerOrderThunk";
import { INACTIVE_ORDER_STATUSES } from "../../constants/order";
import { FETCH_ORDER_PRODUCTS_INTERVAL } from "../../constants/time";
import USER_ROLE from "../../enums/userRole";
import CONTROL_TYPE from "../../enums/controlType";
import getOrderProductStatusOptions from "../../utils/getOrderProductStatusOptions";
import isOrderDeletable from "../../utils/isOrderDeletable";
import OrderDisplay from "../../components/OrderDisplay";

const OrderOwn = () => {
  const {
    order,
    participants,
    possibleParticipants,
    orderProducts,
    removeOrderProductStatus,
    deleteOrderStatus,
    updateOrderProductStatus,
    updateOrderParticipantsStatus,
    searchPossibleParticipantsStatus,
  } = useSelector((state) => state.customerOrder);

  const dispatch = useDispatch();

  const orderControls = isOrderDeletable(orderProducts)
    ? [
        {
          type: CONTROL_TYPE.BUTTON,
          label: "Delete Order",
          onClick: () => dispatch(deleteOrderThunk(order.id)),
          className: "btn-danger",
          status: deleteOrderStatus,
        },
      ]
    : [];

  const getOrderProductControls = (orderProduct) => {
    const controls = [];

    controls.push({
      type: CONTROL_TYPE.SELECT,
      label: "Change Status",
      options: getOrderProductStatusOptions(orderProduct),
      selected: orderProduct.status,
      status: updateOrderProductStatus,
      onChange: (e) =>
        dispatch(
          updateOrderProductStatusThunk({
            orderProductId: orderProduct.id,
            status: e.target.value,
          })
        ),
    });

    if (INACTIVE_ORDER_STATUSES.includes(orderProduct.status)) {
      controls.push({
        type: CONTROL_TYPE.BUTTON,
        label: "Remove",
        onClick: () => dispatch(removeOrderProductThunk(orderProduct.id)),
        className: "btn-danger",
        status: removeOrderProductStatus,
      });
    }

    return controls;
  };

  const getOrderParticipantControls = (participant) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Remove",
        onClick: () =>
          dispatch(
            updateOrderParticipantsThunk({
              orderId: order.id,
              participantIds: order.participants.filter(
                (participantId) => participantId !== participant.id
              ),
            })
          ),
        className: "btn-danger",
        status: updateOrderParticipantsStatus,
      },
    ];
  };

  const getUserControls = (user) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Add participant",
        onClick: () =>
          dispatch(
            updateOrderParticipantsThunk({
              orderId: order.id,
              participantIds: [...order.participants, user.id],
            })
          ),
        className: "btn-primary",
        status: updateOrderParticipantsStatus,
      },
    ];
  };

  const onSearchChange = (e) => {
    dispatch(
      searchPossibleParticipantsThunk({
        role: USER_ROLE.USER,
        partialUsername: e.target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchOrderProductsThunk(order.id));

    const interval = setInterval(() => {
      dispatch(fetchOrderProductsThunk(order.id));
    }, FETCH_ORDER_PRODUCTS_INTERVAL);

    return () => clearInterval(interval);
  }, [order.id, dispatch]);

  useEffect(() => {
    dispatch(fetchParticipantsThunk(order.id));
  }, [order.participants, dispatch]);

  return (
    <OrderDisplay
      order={order}
      participants={participants}
      possibleParticipants={possibleParticipants}
      orderProducts={orderProducts}
      orderControls={orderControls}
      getUserControls={getUserControls}
      getOrderParticipantControls={getOrderParticipantControls}
      getOrderProductControls={getOrderProductControls}
      onSearchChange={onSearchChange}
      searchStatus={searchPossibleParticipantsStatus}
    />
  );
};

export default OrderOwn;
