import Order from "./Order";
import OrderProducts from "./OrderProducts";

const OrderDisplay = ({
  order,
  orderProducts,
  orderControls,
  getOrderProductControls,
}) => {
  return (
    <div className="flex flex-col gap-8 bg-blue-100 p-4 rounded-4xl">
      <Order order={order} controls={orderControls} />

      <OrderProducts
        orderProducts={orderProducts}
        getOrderProductControls={getOrderProductControls}
      />
    </div>
  );
};

export default OrderDisplay;
