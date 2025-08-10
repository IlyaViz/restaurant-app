import { useSelector } from "react-redux";
import ActiveOrder from "./ActiveOrder";
import ActiveOrderProducts from "./ActiveOrderProducts";
import OrderCreator from "./OrderCreator";

const CustomerOrder = () => {
  const token = useSelector((state) => state.auth.token);
  const order = useSelector((state) => state.customerOrder.order);

  return (
    <>
      {!token ? (
        <div className="text-center text-2xl">
          Please log in to create an order.
        </div>
      ) : (
        <div className="bg-blue-100 p-4 rounded-2xl">
          <ActiveOrder />

          {order && (
            <div className="grid gap-8 mt-8 grid-cols-6">
              <ActiveOrderProducts />
            </div>
          )}

          {!order && <OrderCreator />}
        </div>
      )}
    </>
  );
};

export default CustomerOrder;
