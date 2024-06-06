import React, { useEffect, useState } from "react";
import MovieRow from "@/components/movie-row/MovieRow";
import { useLocation } from "react-router-dom";
import MovieService, { Movie } from "@/services/MovieService";
import Loader from "@/components/loader/Loader";

const SearchResults: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    const fetchMovies = async () => {
      try {
        const results = await MovieService.fetchMoviesByName(query, 0);
        setSearchResults(results);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError("Failed to load search results");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [location.search]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="search-results">
      {searchResults.length > 0 ? (
        <MovieRow title="Search Results" movies={searchResults} />
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
