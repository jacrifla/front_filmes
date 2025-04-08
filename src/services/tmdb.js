export const TMDB_API_KEY = '57d80942fbc1daf9cd1429ea9c9ee8f5';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page = 1, genreId = null) {
    let url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=${page}`;

    if (genreId) {
        url += `&with_genres=${genreId}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getGenres() {
    const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR`);
    const data = await response.json();
    return data.genres;
}