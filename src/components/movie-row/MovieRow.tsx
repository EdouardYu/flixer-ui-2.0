import React from 'react';
import { Link } from 'react-router-dom';
import './MovieRow.css';

interface Movie {
    id: number;
    title: string;
    poster_url: string;
}

interface MovieRowProps {
    title: string;
    movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
    return (
        <div className="movie-row">
            <h2>{title}</h2>
            <div className="row-scroll">
                {movies.map(movie => (
                    <div className="movie-card" key={movie.id}>
                        <Link to={`/movie-trailer/${movie.id}`}>
                            <img src={movie.poster_url} alt={movie.title} />
                            <div>{movie.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieRow;
