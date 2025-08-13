import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { tmdbService } from '../service/TMDBService';
import "./ContentCard.css"

const ContentCard = ({ item, onPlay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';

  const handleViewDetails = () => {
    const type = item.title ? 'movie' : 'tv';
    navigate(`/details/${type}/${item.id}`);
  };

  return (
    <div className="content-card">
      <div className="card bg-dark text-white h-100 border-0">
        <div className="card-img-container position-relative">
          {!imageLoaded && !imageError && (
            <div className="card-img-placeholder d-flex justify-content-center align-items-center">
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!imageError ? (
            <img
              src={tmdbService.getImageUrl(item.poster_path)}
              className={`card-img-top ${imageLoaded ? 'loaded' : ''}`}
              alt={title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="card-img-placeholder d-flex justify-content-center align-items-center">
              <span className="text-muted">No Image</span>
            </div>
          )}

          {/* Overlay */}
          <div className="card-overlay">
            <div className="overlay-content text-center">
              <h6 className="text-white mb-2">{title}</h6>
              <div className="d-flex justify-content-center gap-2 mb-2">
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => onPlay(item)}
                  title="Play"
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleViewDetails}
                  title="More Info"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </div>
              {year && <small className="text-muted">{year}</small>}
            </div>
          </div>

          {/* Rating */}
          {item.vote_average > 0 && (
            <div className="rating-badge d-flex align-items-center">
              <FontAwesomeIcon icon={faStar} className="text-warning me-1" />
              <span>{item.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="card-body p-3">
          <h6 className="card-title text-truncate mb-1">{title}</h6>
          {year && <small className="text-muted">{year}</small>}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
