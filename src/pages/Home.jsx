import React from 'react'
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import TrendingMovies from '../components/TrendingMovies';
import Footer from '../components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
    return (
        <div>

            <Navbar/>
             <ToastContainer position="top-right" autoClose={3000} />
            <BannerSlider />
            <TrendingMovies />
            <Footer />
        </div>
    )
}

export default Home
