import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Toast from "../features/toast/Toast";

const MainLayout = () => {
  return (
    <>
      <Header />

      <Toast />

      <Outlet />
    </>
  );
};

export default MainLayout;
