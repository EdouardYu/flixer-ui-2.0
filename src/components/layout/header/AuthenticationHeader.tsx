import { FunctionComponent } from "react";
import "@/components/layout/header/Header.css";
import logo from "@/assets/flixer_logo.jpg";

const AuthenticationHeader: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Flixer Logo" className="logo" />
      </div>
      <hr className="divider" />
    </header>
  );
};

export default AuthenticationHeader;
