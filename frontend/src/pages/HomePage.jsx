import { useDispatch } from "react-redux";
import { addOrderProduct } from "../features/order/orderSlice";
import MenuList from "../features/menu/MenuList";
import CustomerOrder from "../features/order/CustomerOrder";

const HomePage = () => {
  const dispatch = useDispatch();

  const handleAddOrderProduct = (item) => {
  };

  return (
    <div className="mt-8 flex flex-col gap-8">
      <CustomerOrder />

      <MenuList onItemClick={handleAddOrderProduct} />
    </div>
  );
};

export default HomePage;
