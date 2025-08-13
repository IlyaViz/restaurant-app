import { useSelector } from "react-redux";
import KitchenOrders from "../features/kitchen/KitchenOrders";
import SectionSwitcher from "../components/TabSwitcher";

const StaffPage = () => {
  const { role } = useSelector((state) => state.auth);

  const sections = [{ title: "Kitchen Orders", component: <KitchenOrders /> }];

  return (
    <>
      {role === "kitchen_staff" && (
        <div className="flex flex-col gap-8">
          <KitchenOrders />
        </div>
      )}

      {["manager", "owner"].includes(role) && (
        <SectionSwitcher sections={sections} />
      )}
    </>
  );
};

export default StaffPage;
