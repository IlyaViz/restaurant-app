import { useSelector } from "react-redux";
import KitchenOrders from "../features/kitchen/KitchenOrders";

const StaffPage = () => {
  const { role } = useSelector((state) => state.auth);

  return <div>{role === "kitchen_staff" && <KitchenOrders />}</div>;
};

export default StaffPage;
