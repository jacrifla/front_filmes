// src/components/MovieCard.jsx
import React from "react";

function MovieCard({ movie, onWatch, onSave, onRate }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <div className="card h-100 shadow-sm">
      <img src={imageUrl} className="card-img-top" alt={movie.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.title}</h5>

        <div className="mt-auto">
          <div className="btn-group d-flex" role="group">
            <button
              onClick={() => onWatch(movie)}
              className="btn btn-outline-success btn-sm w-100"
              title="Marcar como assistido"
            >
              ✅ Assistido
            </button>
            <button
              onClick={() => onSave(movie)}
              className="btn btn-outline-primary btn-sm w-100"
              title="Adicionar à lista Quero Ver"
            >
              🕒 Quero Ver
            </button>
            <button
              onClick={() => onRate(movie)}
              className="btn btn-outline-warning btn-sm w-100"
              title="Avaliar com estrelas"
            >
              ⭐ Avaliar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
