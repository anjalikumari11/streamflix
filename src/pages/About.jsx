import React from 'react'

function About() {
    return (
        <div className='text-white my-5' style={{padding:"20px",lineHeight:"1.6"}} >
            <h2 className="mb-3">About Us – <span className="text-danger">STEAMFLIX</span></h2>

            <p>
                Welcome to <strong>STEAMFLIX</strong> – your ultimate streaming destination. We believe entertainment should be immersive, accessible, and personalized. Our platform brings together a world-class collection of movies, series, documentaries, and original content — all in one place.
            </p>
            <h4 className='mt-4'>What We Offer</h4>
            <ul className='pl-4'>
                <li className='mb-2'><strong>Diverse Library:</strong> Hollywood hits, indie gems, trending series, and timeless classics.</li>
                <li className='mb-2'><strong>Exclusive Originals:</strong> Watch STEAMFLIX Originals you won't find anywhere else.</li>
                <li className='mb-2'><strong>Multi-Device Access:</strong> Enjoy content on TV, laptop, tablet, or phone.</li>
                <li className='mb-2'><strong>Family Profiles:</strong> Safe and personalized viewing for every family member.</li>
            </ul>
        </div>
    )
}

export default About
