import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({
  movies,
  ratings,
  user,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  handleRateMovie,
  handleComment,
  watchlistMap,
}) {
  return (
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
  );
}
