import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Toast from "../features/toast/Toast";

const MainLayout = () => {
  return (
    <div className="p-4">
      <Header />

      <Toast />

      <Outlet />
    </div>
  );
};

export default MainLayout;
