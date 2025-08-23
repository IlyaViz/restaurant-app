import Order from "./Order";
import OrderProducts from "./OrderProducts";
import OrderParticipants from "./OrderParticipants";

const OrderDisplay = ({
  order,
  participants,
  possibleParticipants,
  orderProducts,
  orderControls,
  getUserControls,
  getOrderParticipantControls,
  getOrderProductControls,
  onSearchChange,
  searchStatus,
}) => {
  return (
    <div className="flex flex-col gap-8 bg-blue-200 rounded-2xl w-3/4">
      <Order order={order} controls={orderControls} />

      {participants && (
        <div className="flex flex-col gap-4">
          <hr />

          <OrderParticipants
            participants={participants}
            possibleParticipants={possibleParticipants}
            getUserControls={getUserControls}
            getOrderParticipantControls={getOrderParticipantControls}
            onSearchChange={onSearchChange}
            searchStatus={searchStatus}
          />
        </div>
      )}

      <hr />

      <OrderProducts
        orderProducts={orderProducts}
        getOrderProductControls={getOrderProductControls}
      />
    </div>
  );
};

export default OrderDisplay;
