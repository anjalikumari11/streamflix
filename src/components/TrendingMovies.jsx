import React, { useEffect, useState } from 'react';
import './TrendingMovies.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import { tmdb } from '../service/tmdb';
import Login from '../pages/admin/Login';
import { toast } from 'react-toastify';

const CATEGORY_LABELS = {
  trending: 'Trending Movies',
  nowPlaying: 'Now Playing',
  popular: 'Popular Movies',
  topRated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
};

function TrendingMovies() {
  const [movies, setMovies] = useState({
    trending: [],
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const [trending, nowPlaying, popular, topRated, upcoming] = await Promise.all([
          tmdb.getTrendingMovies(),
          tmdb.getNowPlayingMovies(),
          tmdb.getPopularMovies(),
          tmdb.getTopRatedMovies(),
          tmdb.getUpcomingMovies(),
        ]);

        setMovies({
          trending: trending.results || [],
          nowPlaying: nowPlaying.results || [],
          popular: popular.results || [],
          topRated: topRated.results || [],
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


  const handleDetailPage = (id) => {
   const user = JSON.parse(localStorage.getItem("currentUser"));
   
    if (!user?.name) {
      setShowLoginModal(true);
    }
    else {
      navigate(`/details/movie/${id}`)
    }
  }

  const addToFav = async (favMovId) => {
    const getFavMovies = JSON.parse(localStorage.getItem("MyFav") || "[]");

    const allMovies = [
      ...movies.trending,
      ...movies.nowPlaying,
      ...movies.popular,
      ...movies.topRated,
      ...movies.upcoming
    ];
    const movieToAdd = allMovies.find(mov => mov.id === favMovId);
    const alreadyExists = getFavMovies.some(mov => mov.id === favMovId);

    if (alreadyExists) {
      toast.warn("Already in Favorites");
    } else {
      const updatedFavs = [...getFavMovies, movieToAdd];
      localStorage.setItem("MyFav", JSON.stringify(updatedFavs));
      toast.success("Added to Favorites!");
    }
  }

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
    <div className="content-row mb-2 mt-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {Object.entries(movies).map(([categoryKey, movieList]) => (
              movieList.length > 0 && (
                <div key={categoryKey} className="mb-5">
                  <h3 className="text-white mb-3 fw-semibold">{CATEGORY_LABELS[categoryKey]}</h3>

                  <div className="trending-movie-slider">
                    {movieList.map(movie => (
                      <div key={movie.id} className="movie-tile">
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
                            onClick={()=>handleDetailPage(movie.id)}
                            style={{cursor:"pointer"}}
                          />

                          <div className="hover-details">
                            <div className="hover-controls">
                              <button className="play-btn" onClick={() => navigate(`/movie/${movie.id}/play`)}>▶ Play</button>
                              <span className="duration">02:16 hrs</span>
                              <div className="hover-icons">
                                <span className="circle-icon" onClick={() => addToFav(movie.id)}><FontAwesomeIcon icon={faHeart}  /></span>
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
                            <span className="rating-badge">U</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}

    </div>
  );
}

export default TrendingMovies;
