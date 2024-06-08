import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieService from '@/services/MovieService';
import './MovieRow.css';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_url: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const getUserDetails = () => {
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

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const navigate = useNavigate();

  const handleClick = async (movieId: number) => {
    const userDetails = getUserDetails();
    if (userDetails) {
      const userId = Number(userDetails.id); 
      if (!userId) {
        console.error("User ID is null or invalid.");
        return;
      }

      try {
        const historyData = { user_id: userId, movie_id: movieId };
        console.log("Sending history data:", historyData);

        await MovieService.addToHistory(historyData);
        navigate(`/movie-trailer/${movieId}`);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error response:", error.response?.data);
        } else if (error instanceof Error) {
          console.error("General error message:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
    } else {
      console.error("Failed to retrieve user details.");
    }
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="row-scroll">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id} onClick={() => handleClick(movie.id)}>
            <img src={movie.poster_url} alt={movie.title} />
            <div>{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
