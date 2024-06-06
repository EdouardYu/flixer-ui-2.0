import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import AuthenticationHeader from "@/components/layout/header/AuthenticationHeader";

const PublicLayout: FunctionComponent = () => {
  return (
    <>
      <AuthenticationHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
