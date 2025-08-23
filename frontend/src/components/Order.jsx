import ActionControls from "./ActionControls";

const Order = ({ order, controls }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl text-gray-900 font-semibold">
        Active Order (id {order.id})
      </h1>

      <ActionControls controls={controls} />
    </div>
  );
};

export default Order;
