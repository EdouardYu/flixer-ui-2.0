import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieRow from "@/components/movie-row/MovieRow";
import MovieService, { Movie } from '@/services/MovieService';

const History: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [history, setHistory] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = (): { id: string } | null => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return null;
        }
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch (e) {
            localStorage.removeItem("authToken");
            return null;
        }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user = getUserDetails();
                if (!user) {
                    setError('User not found');
                    setIsLoading(false);
                    return;
                }
                const movies = await MovieService.getHistory(user.id);
                setHistory(movies);
            } catch (err) {
                console.error('Failed to fetch history:', err);
                setError('Failed to load history');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="history">
            <MovieRow title="History" movies={history} />
        </div>
    );
};

export default History;
