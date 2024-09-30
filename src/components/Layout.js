import { Outlet } from "react-router-dom";
import Header from "./Header/header-component";
import Nav from "./Navigation/nav-component";

const Layout = () => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
