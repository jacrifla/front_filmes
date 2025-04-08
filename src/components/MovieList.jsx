// src/components/MoviesList.jsx
import React from "react";
import MovieCard from "./MovieCard";

function MoviesList({ movies, onWatch, onSave, onRate }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center">Nenhum filme encontrado.</p>;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {movies.map((movie) => (
        <div key={movie.id} className="col">
          <MovieCard
            movie={movie}
            onWatch={onWatch}
            onSave={onSave}
            onRate={onRate}
          />
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
