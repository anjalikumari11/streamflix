import React from 'react'
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import TrendingMovies from '../components/TrendingMovies';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
function Home() {
    return (
        <div>
            <Navbar/>
            <BannerSlider />
            <TrendingMovies />
            <Footer />
        </div>
    )
}

export default Home
