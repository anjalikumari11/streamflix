import React, { useState, useEffect } from 'react';
import ContentRow from '../components/ContentRow';
import { tmdb } from '../service/tmdb';
import Navbar from '../components/Navbar';

const Movies = () => {
    const [movies, setMovies] = useState({
        trending: [],
        popular: [],
        upcoming: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const [trending, popular, upcoming,] = await Promise.all([
                    tmdb.getTrendingMovies(),
                    tmdb.getPopularMovies(),
                    tmdb.getUpcomingMovies(),
                ]);

                setMovies({
                    trending: trending.results || [],
                    popular: popular.results || [],
                    upcoming: upcoming.results || [],
                });
            } catch (err) {
                console.error('Failed to load movies:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div
                className="min-vh-100 bg-dark d-flex align-items-center justify-content-center"
                style={{ paddingTop: '76px' }}
            >
                <div className="text-center text-white">
                    <div className="spinner-border text-danger mb-3" role="status" />
                    <div>Loading Movies...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid py-5">
                <h1 className="text-white my-3 fw-bold mx-3">Movies</h1>

                <ContentRow title="Trending Movies" items={movies.trending} />
                <ContentRow title="Popular Movies" items={movies.popular} />
                <ContentRow title="Upcoming Movies" items={movies.upcoming} />
            </div>
        </>
    );
};

export default Movies;
