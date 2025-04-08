// src/components/GenreFilter.jsx
import React from "react";

function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="mb-4">
      <select
        className="form-select"
        value={selectedGenre}
        onChange={(e) => onSelectGenre(e.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
