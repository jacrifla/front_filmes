import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';

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

  const [showScroll, setShowScroll] = useState(false);

  // Scroll top button
  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (loading) return <p className="text-center mt-5">Carregando filmes...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Catálogo de Filmes Populares</h2>
      <div className="row">
        {movies.map((movie) => {
          const userRating = ratings.find((r) => r.tmdbId === movie.id);
          return (
            <div className="col-md-4 mb-4" key={movie.id}>
              <MovieCard
                movie={movie}
                isLoggedIn={!!user}
                userRating={userRating?.rating || 0}
                userComment={userRating?.comment || ''}
                onAdd={handleAddToWatchlist}
                onRemove={handleRemoveFromWatchlist}
                onRate={handleRateMovie}
                onComment={handleComment}
                watchlistStatus={watchlistMap[movie.id]}
              />
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      <div className="d-flex justify-content-center align-items-center flex-wrap mt-4 gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span className="mx-2">Página</span>

        <input
          type="number"
          min={1}
          max={totalPages}
          value={page}
          onChange={(e) => {
            const newPage = parseInt(e.target.value);
            if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
              setPage(newPage);
            }
          }}
          className="form-control text-center"
          style={{ width: '80px' }}
        />

        <span className="mx-2">de {totalPages}</span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Próxima
        </button>
      </div>

      {/* Scroll to top */}
      {showScroll && (
        <button
          className="btn btn-primary scroll-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </div>
  );
}
