import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FavCard from '../components/FavCard';
import { toast } from 'react-toastify';


function Favorites() {

    const [loading, setLoading] = useState(false);
    const [favMovies, setFavMovies] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const getFavItems = JSON.parse(localStorage.getItem("MyFav")) || [];
        setFavMovies(getFavItems);
    }, []);


    const handleAddToFav = (id) => {
        toast.warn("Already in favorites!"); 
    };

    const handleViewDetails = (id) => {
        window.location.href = `/details/movie/${id}`;
    };

    if (loading) {
        return (
            <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center" style={{ paddingTop: '76px' }}>
                <div className="text-center text-white">
                    <div className="spinner-border text-danger mb-3" role="status" />
                    <div>Loading favoites...</div>
                </div>
            </div>
        );
    }


    return (
        <>
            <Navbar />
            <div className="container mt-5 py-4">
                <h2 className="text-white mb-4">My Favorites</h2>
                {favMovies.length > 0 ? (
                    <div className="trending-movie-slider">
                        {favMovies.map((movie) => (
                            <FavCard
                                key={movie.id}
                                movie={movie}
                                onAddToFav={handleAddToFav}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-white">No favorites yet.</p>
                )}
            </div>
        </>
    )
}

export default Favorites
