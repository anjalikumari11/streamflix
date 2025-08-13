const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = {
  getTrendingMovies: async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.json();
  },

  getTrendingTVShows: async () => {
    const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
    return response.json();
  },

  getPopularMovies: async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.json();
  },

  getTopRatedMovies: async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    return response.json();
  },

  getUpcomingMovies: async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    return response.json();
  },

  getNowPlayingMovies: async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    return response.json();
  },

  getPopularTVShows: async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    return response.json();
  },
  searchMovies: async (query) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    return res.json();
  },
};
