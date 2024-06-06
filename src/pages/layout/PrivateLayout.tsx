import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/footer/Footer";
import Header from "@/components/layout/header/Header";


const PrivateLayout: FunctionComponent = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
