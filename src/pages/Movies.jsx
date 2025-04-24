import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useMovies from '../hooks/useMovies';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function Movies() {
  const { user, token } = useAuth();
  const {
    movies,
    page,
    totalPages,
    loading,
    ratings,
    watchlistMap,
    handleAddToWatchlist,
    handleRemoveFromWatchlist,
    handleRateMovie,
    handleComment,
    setPage,
  } = useMovies(user, token);

  if (loading) return <p className="text-center mt-5">Carregando filmes...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Catálogo de Filmes Populares</h2>

      <MovieList
        movies={movies}
        ratings={ratings}
        user={user}
        handleAddToWatchlist={handleAddToWatchlist}
        handleRemoveFromWatchlist={handleRemoveFromWatchlist}
        handleRateMovie={handleRateMovie}
        handleComment={handleComment}
        watchlistMap={watchlistMap}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      <ScrollToTopButton />
    </div>
  );
}
