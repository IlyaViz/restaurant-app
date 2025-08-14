import { useSelector } from "react-redux";
import KitchenOrders from "../features/kitchen/KitchenOrders";
import SectionSwitcher from "../components/TabSwitcher";
import MenuManagement from "../features/menu-management/MenuManagement";

const StaffPage = () => {
  const { role } = useSelector((state) => state.auth);

  let sections = [];

  if (["manager", "owner"].includes(role)) {
    sections.push(
      { title: "Kitchen Orders", component: <KitchenOrders /> },
      { title: "Menu Management", component: <MenuManagement /> }
    );
  }

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
