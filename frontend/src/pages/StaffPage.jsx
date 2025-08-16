import { useSelector } from "react-redux";
import USER_ROLE from "../enums/userRole";
import KitchenOrders from "../features/kitchen/KitchenOrders";
import SectionSwitcher from "../components/TabSwitcher";
import MenuManagement from "../features/menu-management/MenuManagement";
import UserManagement from "../features/user-management/UserManagement";

const StaffPage = () => {
  const { role } = useSelector((state) => state.auth);

  let sections = [];

  if ([USER_ROLE.MANAGER, USER_ROLE.OWNER].includes(role)) {
    sections.push(
      { title: "Kitchen Orders", component: <KitchenOrders /> },
      { title: "Menu Management", component: <MenuManagement /> },
      { title: "User Management", component: <UserManagement /> }
    );
  }

  return (
    <>
      {role === USER_ROLE.KITCHEN_STAFF && (
        <div className="flex flex-col gap-8">
          <KitchenOrders />
        </div>
      )}

      {[USER_ROLE.MANAGER, USER_ROLE.OWNER].includes(role) && (
        <SectionSwitcher sections={sections} />
      )}
    </>
  );
};

export default StaffPage;
