import React, { useEffect, useState } from "react";
import MovieRow from "@/components/movie-row/MovieRow";
import { useLocation } from "react-router-dom";
import MovieService, { Movie } from "@/services/MovieServices";
import Loader from "@/components/loader/Loader";

const TagsResults: React.FC = () => {
  const [tagResults, setTagResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tag = queryParams.get("tag");

    if (tag) {
      const fetchMovies = async () => {
        try {
          const results = await MovieService.fetchMoviesByTag(tag, 0);
          setTagResults(results);
        } catch (err) {
          console.error("Failed to fetch tag results:", err);
          setError("Failed to load tag results");
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovies();
    }
  }, [location.search]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tag-results">
      {tagResults.length > 0 ? (
        <MovieRow title="Tag Results" movies={tagResults} />
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default TagsResults;
