import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import About from '../pages/About';
import "./footer.css"
import FAQ from '../pages/FAQ';
import Contact from '../pages/Contact';

function Footer() {
  // const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  }
  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  }
  return (
    <div className='p-2 flex-column d-flex justify-content-center align-items-center' style={{
      background: "rgba(0,0,0,0.5)"
    }}>
      <div className='d-flex gap-5 my-4'>
        <div className='text-decoration-none text-white' style={{ cursor: "pointer" }} onClick={() => toggleAbout()}>About</div>
        <div className='text-decoration-none text-white' style={{ cursor: "pointer" }} onClick={() => toggleFAQ()} >FAQ</div>
        <div className='text-decoration-none text-white' style={{ cursor: "pointer" }} onClick={() => setShowContactModal(true)} >Contact Us</div>
        <div className='text-decoration-none text-white' style={{ cursor: "pointer" }} >Pricing</div>
      </div>
      <span className='text-white text-center'>&copy; Copyright 2025 - <strong className='text-danger'>STEAMFLIX</strong></span>
      {/* about */}
      <div className={`slide-up-panel ${showAbout ? 'open' : ''}`}>
        <div className="m-3">
          <button className="close-btn" onClick={() => toggleAbout()}>Close</button>
          <About />
        </div>
      </div>
      {/* FAQ */}
      <div className={`slide-up-panel ${showFAQ ? 'open' : ''}`}>
        <div className="m-3">
          <button className="close-btn" onClick={() => toggleFAQ()}>Close</button>
          <FAQ />
        </div>
      </div>
      {/* contact us */}
      {showContactModal && <Contact onClose={() => setShowContactModal(false)} />}

    </div>
  )
}

export default Footer
