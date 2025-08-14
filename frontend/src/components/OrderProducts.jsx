import ActionControls from "./ActionControls";
import Product from "./Product";

const OrderProducts = ({ orderProducts, getOrderProductControls }) => {
  return (
    <div className="grid grid-cols-8 gap-8">
      {orderProducts.map((orderProduct) => (
        <div key={orderProduct.id} className="flex flex-col items-center">
          <Product {...orderProduct.product} imageClassName="h-14" />

          <ActionControls controls={getOrderProductControls(orderProduct)} />
        </div>
      ))}
    </div>
  );
};

export default OrderProducts;
