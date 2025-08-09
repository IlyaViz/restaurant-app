import MenuList from "../features/menu/MenuList";
import CustomerOrder from "../features/order/CustomerOrder";

const HomePage = () => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <CustomerOrder />

      <MenuList />
    </div>
  );
};

export default HomePage;
