import { useSelector } from "react-redux";
import CustomerMenuList from "../features/customer-menu/CustomerMenuList";
import CustomerOrder from "../features/customer-order/CustomerOrder";

const HomePage = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col gap-8 text-center">
      {token ? <CustomerOrder /> : <div>Login to create order</div>}

      <div className="flex flex-col items-center gap-8">
        <CustomerMenuList />
      </div>
    </div>
  );
};

export default HomePage;
