import MenuList from "../features/menu/MenuList";
import CustomerOrder from "../features/customer-order/CustomerOrder";

const HomePage = () => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <CustomerOrder />

      <div className="flex flex-col items-center gap-8">
        <MenuList />
      </div>
    </div>
  );
};

export default HomePage;
