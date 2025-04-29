import { API_KEY } from "../utils/constants";

const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';

// Função genérica para chamadas à API TMDB
const fetchFromTMDB = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
    ...params,
  });
  url.search = searchParams;

  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || 'Erro ao buscar dados na TMDB');
  }
  return response.json();
};

/* ================= FILMES ================= */

// Filmes Populares
export const getPopularMovies = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/popular', { page });
  return data;
};

// Filmes Top Rated
export const getTopRatedMovies = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/top_rated', { page });
  return data.results;
};

// Filmes Upcoming
export const getUpcomingMovies = async (page = 1) => {
  const data = await fetchFromTMDB('/movie/upcoming', { page });
  return data.results;
};

// Buscar Filmes
export const searchMovies = async (query, page = 1) => {
  if (!query) return [];
  const data = await fetchFromTMDB('/search/movie', { query, page, include_adult: false });
  return data.results;
};

// Detalhes do Filme
export const getMovieDetails = async (movieId) => {
  if (!movieId) throw new Error('ID do filme é obrigatório');
  return fetchFromTMDB(`/movie/${movieId}`);
};

// Créditos do Filme
export const getMovieCredits = async (movieId) => {
  if (!movieId) throw new Error('ID do filme é obrigatório');
  return fetchFromTMDB(`/movie/${movieId}/credits`);
};

// Filmes com Parâmetros
export const getPopularMoviesWithParams = async (params = {}) => {
  return fetchFromTMDB('/discover/movie', params);
};

/* ================= SÉRIES ================= */

// Séries Populares
export const getPopularSeries = async (page = 1) => {
  const data = await fetchFromTMDB('/tv/popular', { page });
  return data;
};

// Séries Top Rated
export const getTopRatedSeries = async (page = 1) => {
  const data = await fetchFromTMDB('/tv/top_rated', { page });
  return data;
};

// Buscar Séries
export const searchSeries = async (query, page = 1) => {
  if (!query) return [];
  const data = await fetchFromTMDB('/search/tv', { query, page, include_adult: false });
  return data.results;
};

// Detalhes da Série
export const getSeriesDetails = async (seriesId) => {
  if (!seriesId) throw new Error('ID da série é obrigatório');
  return fetchFromTMDB(`/tv/${seriesId}`);
};

// Créditos da Série
export const getSeriesCredits = async (seriesId) => {
  if (!seriesId) throw new Error('ID da série é obrigatório');
  return fetchFromTMDB(`/tv/${seriesId}/credits`);
};

// Séries com Parâmetros
export const getPopularSeriesWithParams = async (params = {}) => {
  return fetchFromTMDB('/discover/tv', params);
};

/* ================= GÊNEROS ================= */

// Gêneros de Filmes
export const getGenres = async () => {
  const data = await fetchFromTMDB('/genre/movie/list');
  return data.genres;
};

// Gêneros de Séries
export const getSeriesGenres = async () => {
  const data = await fetchFromTMDB('/genre/tv/list');
  return data.genres;
};

const tmdbService = {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getPopularMoviesWithParams,
  getPopularSeries,
  getTopRatedSeries,
  searchSeries,
  getSeriesDetails,
  getSeriesCredits,
  getPopularSeriesWithParams,
  getGenres,
  getSeriesGenres,
};

export default tmdbService;