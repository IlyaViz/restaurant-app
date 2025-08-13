import ActionControls from "./ActionControls";

const Order = ({ order, controls }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Active Order</h2>

      <p className="text-lg">Table: {order.table}</p>

      <ActionControls controls={controls} />
    </div>
  );
};

export default Order;
