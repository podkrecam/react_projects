import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Navbar />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </>
  );
}
export default Layout;
