import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/services/axiosConfig";
import "./MovieTrailer.css";
import Loader from "@/components/loader/Loader";

interface MovieDetails {
  id: number;
  title: string;
  description: string;
  url: string;
}

const MovieTrailer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/movies/${id}`);
        setMovie({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          url: response.data.url,
        });
        console.log("Movie data:", response.data);
      } catch (err) {
        setError("Failed to load movie");
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="movie-page">
      <h1>{movie.title}</h1>
      {movie.url && (
        <iframe
          className="movie-trailer"
          src={movie.url}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <h2>Description</h2>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieTrailer;
