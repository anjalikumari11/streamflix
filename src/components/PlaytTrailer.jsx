import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbService } from "../service/TMDBService";

function PlayTrailer() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const data = await tmdbService.getMovieVideos(id);
        const videos = data.results || [];
        const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube")
                     || videos.find(v => v.type === "Teaser" && v.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrailer();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center mt-5">Loading trailer...</div>;
  }

  if (!trailerKey) {
    return <div className="text-white text-center mt-5"><h3>No trailer available</h3></div>;
  }

  return (
    <div className="video-page" style={{ background: "black", height: "100vh" }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default PlayTrailer;
