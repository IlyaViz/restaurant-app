import ActionControls from "./ActionControls";
import Product from "./Product";

const OrderProducts = ({ orderProducts, getOrderProductControls }) => {
  return (
    <div className="grid gap-8 p-4 md:grid-cols-4 2xl:grid-cols-8">
      {orderProducts.map((orderProduct) => (
        <div
          key={orderProduct.id}
          className="flex flex-col items-center bg-blue-100 rounded-2xl"
        >
          <Product {...orderProduct.product} imageClassName="h-16" />

          <ActionControls controls={getOrderProductControls(orderProduct)} />
        </div>
      ))}
    </div>
  );
};

export default OrderProducts;
