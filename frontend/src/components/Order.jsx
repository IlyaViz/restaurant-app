import ActionControls from "./ActionControls";

const Order = ({ order, controls }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl text-gray-900 font-semibold">
        Active Order (id {order.id})
      </h2>

      <ActionControls controls={controls} />
    </div>
  );
};

export default Order;
