const API_KEY = 'a155845b51bff2c9aa9139502d8c30f2';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbService = {
  async getMovieVideos(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error('Failed to fetch videos');
    return res.json();
  },
  async getMovieDetails(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    return await res.json();
  },

  async getTVShowDetails(id) {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
    return await res.json();
  },

  async getSimilarMovies(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`);
    return await res.json();
  },

  async getSimilarTVShows(id) {
    const res = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US`);
    return await res.json();
  },

  getImageUrl(path, size = 'w500') {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
  },

  getBackdropUrl(path, size = 'original') {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
  }


};
