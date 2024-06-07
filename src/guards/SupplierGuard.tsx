import { FunctionComponent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface GuardProps {
  children: ReactNode;
}

interface User {
  exp: number;
  id: string;
  role: string;
  username: string;
}

const getUserDetails = (): User | null => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.log("No token found in local storage.");
    return null;
  }

  console.log("Token found:", token);

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Parsed user details:", payload);
    return payload;
  } catch (e) {
    console.error("Failed to parse token:", e);
    localStorage.removeItem("authToken");
    return null;
  }
};

export const SupplierGuard: FunctionComponent<GuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserDetails();
    console.log("SupplierGuard - User:", user);

    if (!user) {
      navigate("/authentication/login", { replace: true });
    } else if (user.role !== "SUPPLIER") {
      navigate("/authentication/login", { replace: true });
    } else {
    }
  }, [navigate]);

  return <>{children}</>;
};
