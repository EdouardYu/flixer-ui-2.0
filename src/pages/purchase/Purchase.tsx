import { useState, useEffect, FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieService from "@/services/MovieService";
import UserService from "@/services/UserService";
import Loader from "@/components/loader/Loader";
import "@/pages/purchase/Purchase.css";

interface PurchaseData {
  user_id: string | undefined;
  movie_id: string | undefined;
}

interface Supplier {
  username: string;
}

interface MovieData {
  title: string;
  description: string;
  supplier: Supplier;
  poster_url: string;
  price: number;
  release_at: string;
  director: string;
}

const Purchase: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<MovieData>();
  const [purchase, setPurchase] = useState<PurchaseData>();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null
  );
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const payload = JSON.parse(atob(token!.split(".")[1]));
    const userId = payload.id;

    const fetchMovieAndSubscription = async () => {
      try {
        const movieData = await MovieService.getMovieDetails(id);
        setMovie(movieData);

        const subscribed = await UserService.checkSubscribed(userId);
        setIsSubscribed(subscribed);

        const purchaseData = { user_id: userId, movie_id: id };
        setPurchase(purchaseData);

        setIsLoading(false);
      } catch (error) {
        setGlobalError("Failed to fetch movie details.");
        setIsLoading(false);
      }
    };

    fetchMovieAndSubscription();
  }, [id, navigate]);

  const handleSubscriptionSubmit = async () => {
    try {
      await UserService.subscribeUser(purchase?.user_id);
      navigate(`/movie-trailer/${id}`);
    } catch (error) {
      setSubscriptionError("Failed to subscribe, please try again later");
    }
  };

  const handlePurchaseSubmit = async () => {
    try {
      await MovieService.purchaseMovie(purchase);
      navigate(`/movie-trailer/${id}`);
    } catch (error) {
      setPurchaseError("Failed to purchase movie, please try again later");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="purchase-page">
      {globalError && <div className="error global-error">{globalError}</div>}
      {movie && (
        <div className="movie-details">
          <img src={movie.poster_url} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Price: ${movie.price.toFixed(2)}</p>
          <p>Supplier: {movie.supplier.username}</p>
          <p>Director: {movie.director}</p>
          {!isSubscribed && (
            <button onClick={() => setShowSubscriptionPopup(true)}>
              Subscribe
            </button>
          )}
          <button onClick={() => setShowPurchasePopup(true)}>Purchase</button>
        </div>
      )}
      {showSubscriptionPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Subscribe</h3>
            {subscriptionError && (
              <div className="error subscription-error">
                {subscriptionError}
              </div>
            )}
            <div className="popup-buttons">
              <button
                className="close-button"
                onClick={() => setShowSubscriptionPopup(false)}
              >
                Close
              </button>
              <button
                className="submit-button"
                onClick={handleSubscriptionSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showPurchasePopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Purchase Movie</h3>
            {purchaseError && (
              <div className="error purchase-error">{purchaseError}</div>
            )}
            <div className="popup-buttons">
              <button
                className="close-button"
                onClick={() => setShowPurchasePopup(false)}
              >
                Close
              </button>
              <button className="submit-button" onClick={handlePurchaseSubmit}>
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
