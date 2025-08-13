import React, { useState, useEffect } from 'react';
import './BannerSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { tmdbService } from '../service/TMDBService';

const BannerSlider = () => {
    const [bannerItems, setBannerItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchBannerItems = async () => {
            try {
                const res = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=a155845b51bff2c9aa9139502d8c30f2");
                const data = await res.json();
                const formatted = data.results.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    backdrop_path: movie.backdrop_path
                }));
                setBannerItems(formatted);
            } catch (e) {
                console.error("Failed to fetch banner items:", e.message);
            }
        };

        fetchBannerItems();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerItems.length) % bannerItems.length);
    };

    if (bannerItems.length === 0) return <div className="text-white text-center py-5">Loading banners...</div>;

    const currentItem = bannerItems[currentIndex];
    const title = currentItem.title;
    const releaseDate = currentItem.release_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
    const backdrop = tmdbService.getBackdropUrl(currentItem.backdrop_path, 'original');


    return (
        <div className="banner-slider position-relative">
            <div className="banner-slide position-relative">
                <div
                    key={currentItem.id}
                    className='banner-img'
                    style={{
                        backgroundImage: `url(${backdrop})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh'
                    }}
                ></div>

                <div className="banner-overlay" />

                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-6">
                            <div className="banner-content" style={{ marginTop: "160px" }}>
                                <h1 className="banner-title display-4 fw-bold text-white mb-3">
                                    {title}
                                </h1>
                                <p className="banner-description text-white mb-4 fs-5">
                                    {(currentItem.overview?.slice(0, 350) + "...") || "No description available."}
                                </p>
                                <div className="banner-meta mb-4">
                                    <span className="badge bg-success me-2">
                                        {Math.round(currentItem.vote_average * 10)}% Match
                                    </span>
                                    {year && <span className="text-white-50 me-2">{year}</span>}
                                    <span className="badge bg-secondary">HD</span>
                                </div>
                                <div className="banner-buttons" >
                                    <button className="btn btn-danger btn-lg me-3 " onClick={() => navigate(`/movie/${currentItem.id}/play`)}>
                                        <FontAwesomeIcon icon={faPlay} className="me-2" />
                                        Play
                                    </button>
                                    <button className="btn btn-outline-danger btn-lg" onClick={() => navigate(`/details/movie/${currentItem.id}`)} >
                                        More Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-dark banner-nav banner-nav-prev" onClick={prevSlide}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} />
                </button>
                <button className="btn btn-dark banner-nav banner-nav-next" onClick={nextSlide}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} />
                </button>

                <div className="banner-indicators">
                    {bannerItems.map((_, index) => (
                        <button
                            key={index}
                            className={`banner-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerSlider;
