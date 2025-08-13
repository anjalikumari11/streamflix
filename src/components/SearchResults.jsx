import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tmdb } from '../service/tmdb';
import Footer from './Footer';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function SearchResults() {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("currentUser"));
        if (Array.isArray(admin) && admin.length > 0) {
            setUser(admin[0]);
        }
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const res = await tmdb.searchMovies(query);
                setResults(res.results || []);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    const handleDetailPage = (id) => {
        navigate(`/details/movie/${id}`);
    };

    if (loading) {
        return (
            <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center" style={{ paddingTop: '76px' }}>
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
            <div className="container mt-5 pt-5 text-white">
                <h3>Search results for: {query}</h3>
                <div className="row">
                    {results.length > 0 ? results.map(movie => (
                        <div key={movie.id} className="col-3 mb-4 movie-tile">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="movie-thumbnail"
                            />

                            <div className="hover-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    className="hover-video"
                                />

                                <div className="hover-details">
                                    <div className="hover-controls">
                                        <button className="play-btn">▶ Play</button>
                                        <span className="duration">02:16 hrs</span>
                                        <div className="hover-icons">
                                            <span className="circle-icon">＋</span>
                                            <span
                                                className="circle-icon"
                                                onClick={() => handleDetailPage(movie.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <FontAwesomeIcon icon={faBars} />
                                            </span>
                                        </div>
                                    </div>

                                    <h5 className="hover-title">{movie.title || movie.name}</h5>
                                    <p className="hover-genre">{movie.genre_ids?.join(', ') || 'Genre'}</p>
                                    <span className="rating-badge">U</span>
                                </div>
                            </div>
                        </div>
                    )) : <p>No results found.</p>}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SearchResults;
