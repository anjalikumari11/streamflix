import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faArrowLeft, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { tmdbService } from '../service/TMDBService';
import Navbar from './Navbar';
import ContentRow from './ContentRow';
import Footer from './Footer';


const DetailPage = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [similarItems, setSimilarItems] = useState([]);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        const loadDetails = async () => {
            if (!type || !id) return;

            try {
                const isMovie = type === 'movie';

                const details = isMovie
                    ? await tmdbService.getMovieDetails(+id)
                    : await tmdbService.getTVShowDetails(+id);

                const similar = isMovie
                    ? await tmdbService.getSimilarMovies(+id)
                    : await tmdbService.getSimilarTVShows(+id);

                setItem(details);
                setSimilarItems(similar.results || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [type, id]);

    if (loading) {
        return (
            <div className="text-center text-white py-5">
                <div className="spinner-border text-danger" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="text-center text-white py-5">
                <h3>Item not found</h3>
                <button className="btn btn-danger mt-3" onClick={() => navigate('/')}>
                    Go Home
                </button>
            </div>
        );
    }

    const title = item.title || item.name;
    const year = (item.release_date || item.first_air_date)
        ? new Date(item.release_date || item.first_air_date).getFullYear()
        : '';
    const genres = item.genres?.map(g => g.name).join(', ') || '';
    const runtime = item.runtime || null;
    const poster = tmdbService.getImageUrl(item.poster_path, 'w500');
    const backdrop = tmdbService.getBackdropUrl(item.backdrop_path, 'original');

   
    return (
        <>
            <Navbar />
            <div className="detail-page text-white" style={{ paddingTop: '76px' }}>
                {/* Banner */}
                <div
                    className="position-relative"
                    style={{
                        backgroundImage: `url(${backdrop})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '90vh'
                    }}
                >
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.7)' }}></div>

                    <div className="container position-relative h-100 d-flex align-items-end pb-5">
                        <div className="row w-100" >
                            <div className="col-md-8" >
                                <button
                                    className="btn btn-outline-light mb-3 backBtn"
                                    onClick={() => navigate(-1)}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                                    Back
                                </button>

                                <h1 className="display-3 fw-bold" style={{ marginTop: "130px" }}>{title.length>45 ? <h2>{title}</h2> : title}</h1>

                                <p className="mb-3">{(item.overview?.slice(0,250) + "...")}</p>

                                <div className="mb-3">
                                    {year && (
                                        <span className="me-3">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                            {year}
                                        </span>
                                    )}
                                    {runtime && (
                                        <span className="me-3">
                                            <FontAwesomeIcon icon={faClock} className="me-1" />
                                            {runtime} min
                                        </span>
                                    )}
                                </div>

                                <p className="text-white-50 mb-4">
                                    <strong >Genres:</strong> {genres}
                                </p>

                                <div className="d-flex gap-3">
                                    <button className="btn btn-danger btn-lg" onClick={() =>navigate(`/movie/${id}/play`)}>
                                        <FontAwesomeIcon icon={faPlay} className="me-2" />
                                        Play
                                    </button>
                                    <button className="btn btn-outline-danger btn-lg">
                                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                                        Add to List
                                    </button>
                                </div>
                            </div>

                            {/* mini poster */}
                            <div className="col-md-4 d-none d-md-block">
                                <img src={poster} alt={title} className="img-fluid rounded shadow" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar content */}
                {similarItems.length > 0 && (
                    <div className="container py-5" >
                        <ContentRow title={`More Like ${title}`} items={similarItems} />
                    </div>
                )}
            </div>

            <Footer />
        </>

    );
};

export default DetailPage;
