import { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "@/services/UserService";
import MovieService from "@/services/MovieServices";

interface GuardProps {
  children: ReactNode;
}

interface PurchaseData {
  user_id: string | undefined;
  movie_id: string | undefined;
}

export const MovieGuard: FunctionComponent<GuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const flag = useRef(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const payload = JSON.parse(atob(token!.split(".")[1]));
        const userId = payload.id;

        const isSubscribed = await UserService.checkSubscribed(userId);

        if (isSubscribed) {
          return;
        }

        const purchaseData: PurchaseData = {
          user_id: userId,
          movie_id: id,
        };

        const isPurchased = await MovieService.checkPurchased(purchaseData);

        if (!isPurchased) {
          navigate(`/purchase/${id}`);
        }
      } catch (error) {
        navigate("/");
      }
    };

    if (flag.current === false) {
      checkAccess();
    }

    return () => {
      flag.current = true;
    };
  }, [id, navigate]);

  return <>{children}</>;
};

export const InverseMovieGuard: FunctionComponent<GuardProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const flag = useRef(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const payload = JSON.parse(atob(token!.split(".")[1]));
        const userId = payload.id;

        const purchaseData: PurchaseData = {
          user_id: userId,
          movie_id: id,
        };

        const isPurchased = await MovieService.checkPurchased(purchaseData);

        if (isPurchased) {
          navigate(`/movie-trailer/${id}`);
          return;
        }
      } catch (error) {
        navigate("/");
      }
    };

    if (flag.current === false) {
      checkAccess();
    }

    return () => {
      flag.current = true;
    };
  }, [id, navigate]);

  return <>{children}</>;
};
