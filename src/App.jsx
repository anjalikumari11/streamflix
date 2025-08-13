import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './components/DetailPage';
import Movies from './pages/Movies';
import Login from './pages/admin/Login';
import { ToastContainer } from 'react-bootstrap';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import SearchResults from './components/SearchResults';
import PlayTrailer from './components/PlaytTrailer';
function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<ProtectedRoutes>
          <DetailPage />
        </ProtectedRoutes>} />
        <Route path="/movie/:id/play" element={<PlayTrailer />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/search/:query" element={<SearchResults />} />

        <Route path="*" element={"error"} />
      </Routes>
    </Router>
  )
}

export default App
