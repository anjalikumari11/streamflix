import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faHome, faClose, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import Login from '../pages/admin/Login';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchVisible(false);
      setSearchQuery('');
    }
  }
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("user"));
    if (Array.isArray(admin) && admin.length > 0) {
      setUser(admin[0]);
    }

  }, [])
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLoginModal(true);
  };

  return (
    <>
      <nav className={`navbar fixed-top ${scrolled ? 'bg-dark' : 'bg-transparent'} navbar-expand-lg`}>
        <div className="container-fluid">
          <button className="navbar-brand text-danger fw-bold fs-3 btn btn-link" onClick={() => navigate('/')}>
            STREAMFLIX
          </button>

          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="collapse navbar-collapse NavResLink" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {['/', '/movies'].map((path, i) => (
                <li className="nav-item" key={path}>
                  <button
                    className={`nav-link btn btn-link ${location.pathname === path ? 'text-danger' : 'text-white'}`}
                    onClick={() => navigate(path)}
                  >
                    {i === 0 ? <FontAwesomeIcon icon={faHome} className="me-2" /> : null}
                    {['Home', 'Movies'][i]}
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-3">
              <button className="btn text-white" onClick={() => setSearchVisible(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </button>

              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle bg-danger"
                  data-bs-toggle="dropdown"
                >
                  {user ? (
                    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase() 
                  ) : 'Sign In'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark">
                  {user ? (
                    <>
                      <li><span className="dropdown-item text-light bg-dark"><FontAwesomeIcon icon={faUser} /> {user.email}</span></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-light bg-dark" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faSignOut} className="me-2" /> Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button className="dropdown-item text-light bg-dark" onClick={handleLoginClick}>
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Sign In
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {searchVisible && (
        <div className="search-overlay position-fixed top-0 start-0 w-100 bg-dark bg-opacity-75 d-flex flex-column align-items-center justify-content-center z-1050">
          <button className="btn text-light position-absolute top-0 end-0 m-3" onClick={() => setSearchVisible(false)}>
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
          <form onSubmit={handleSearch} className="w-75">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search movies, shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button className="btn btn-light" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      )}
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </>
  );
}

export default Navbar;
