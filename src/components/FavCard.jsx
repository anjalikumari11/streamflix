import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function FavCard({ movie, onAddToFav, onViewDetails }) {
    const navigate = useNavigate();

//     const removeFavById = (id) => {
//     const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
//     const updatedFavs = storedFavs.filter(movieId => movieId !== id);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavs));
// };
    return (
        <div className="movie-tile">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="movie-thumbnail"
            />

            <div className="hover-card" >
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="hover-video"
                    onClick={() => onViewDetails(movie.id)}
                />

                <div className="hover-details">
                    <div className="hover-controls">
                        <button
                            className="play-btn"
                            onClick={() => navigate(`/movie/${movie.id}/play`)}
                        >
                            ▶ Play
                        </button>
                        <span className="duration">02:16 hrs</span>
                        <div className="hover-icons">
                            <span
                                className="circle-icon"
                                onClick={() => onAddToFav(movie.id)}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            <span
                                className="circle-icon"
                                onClick={() => onViewDetails(movie.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                        </div>
                    </div>
                    <h5 className="hover-title">{movie.title || movie.name}</h5>
                    <span className="rating-badge" style={{cursor:"pointer"}}><FontAwesomeIcon icon={faClose} /></span>
                </div>
            </div>
        </div>
    );
}

export default FavCard;
