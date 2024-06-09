import React, { useEffect, useState, useCallback } from "react";
import MovieRow from "@/components/movie-row/MovieRow";
import "./Home.css";
import { useLocation } from "react-router-dom";
import MovieService, { Movie } from "@/services/MovieService";
import Loader from "@/components/loader/Loader";

const Homepage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();

  const loadMovies = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const allMoviesData = await MovieService.fetchMovies(pageNumber);
      const discoverMoviesData = await MovieService.fetchDiscoverMovies(pageNumber);
      const topRatedMoviesData = await MovieService.fetchTopRatedMovies(pageNumber);

      setAllMovies((prevMovies) => {
        const newMovies = allMoviesData.content.filter(
          (movie) => !prevMovies.some((m) => m.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setDiscoverMovies((prevMovies) => {
        const newMovies = discoverMoviesData.content.filter(
          (movie) => !prevMovies.some((m) => m.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setTopRatedMovies((prevMovies) => {
        const newMovies = topRatedMoviesData.content.filter(
          (movie) => !prevMovies.some((m) => m.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setHasMore(
        allMoviesData.totalPages > pageNumber + 1 ||
        discoverMoviesData.totalPages > pageNumber + 1 ||
        topRatedMoviesData.totalPages > pageNumber + 1
      );
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError("Failed to load movies");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredAllMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery)
      );
      const filteredDiscoverMovies = discoverMovies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery)
      );
      const filteredTopRatedMovies = topRatedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery)
      );
      setAllMovies(filteredAllMovies);
      setDiscoverMovies(filteredDiscoverMovies);
      setTopRatedMovies(filteredTopRatedMovies);
    } else {
      setAllMovies([]);
      setDiscoverMovies([]);
      setTopRatedMovies([]);
      setPage(0); 
      loadMovies(0);
    }
  }, [location.search]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homepage">
      {allMovies.length > 0 ? (
        <MovieRow title="All Movies" movies={allMovies} />
      ) : (
        <Loader />
      )}
      {discoverMovies.length > 0 ? (
        <MovieRow title="Discover" movies={discoverMovies} />
      ) : (
        <Loader />
      )}
      {topRatedMovies.length > 0 ? (
        <MovieRow title="Top Rated" movies={topRatedMovies} />
      ) : (
        <Loader />
      )}
      {isLoading && <Loader />}
      {hasMore && !isLoading && (
        <button onClick={loadMoreMovies} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Homepage;
