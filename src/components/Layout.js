import { Outlet } from "react-router-dom";
import Header from "./header-component";
import Nav from "./nav-component";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
