import React, { useEffect, useState } from "react";
import MovieRow from "@/components/movie-row/MovieRow";
import "./Home.css";
import { useLocation } from "react-router-dom";
import MovieService, { Movie, Category } from "@/services/MovieService";
import Loader from "@/components/loader/Loader";

const Homepage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const location = useLocation();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const allMovies = await MovieService.fetchMovies(2);
        setCategories([
          { title: 'All Movies', movies: allMovies.slice(0,20) },
          { title: 'Discover', movies: allMovies.slice(21, 35) }, 
          { title: 'Monthly Rank', movies: allMovies.slice(36, 50) } 
      ]);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies");
        setIsLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const results = categories
        .flatMap((category) => category.movies)
        .filter((movie) => movie.title.toLowerCase().includes(lowerCaseQuery));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [location.search, categories]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homepage">
      {searchResults.length > 0 ? (
        <MovieRow title="Search Results" movies={searchResults} />
      ) : (
        categories.map((category) => (
          <MovieRow
            key={category.title}
            title={category.title}
            movies={category.movies}
          />
        ))
      )}
    </div>
  );
};

export default Homepage;
