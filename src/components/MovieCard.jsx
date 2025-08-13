import React, { useState } from "react";
import MovieTrailer from "./MovieTrailer";

function MovieCard({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div>
      <img src={tmdbService.getImageUrl(movie.poster_path)} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button onClick={() => setShowTrailer(true)}>▶ Play</button>

      {showTrailer && (
        <div className="modal">
          <button onClick={() => setShowTrailer(false)}>Close</button>
          <MovieTrailer movieId={movie.id} />
        </div>
      )}
    </div>
  );
}

export default MovieCard;
