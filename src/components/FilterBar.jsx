import React from 'react';

export default function FilterBar({
  genres,
  selectedGenre,
  onGenreChange,
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) {
  return (
    <form onSubmit={onSearchSubmit} className="row gx-2 gy-2 align-items-end mb-4">
      <div className="col-12 col-sm-auto">
        <select
          id="genreSelect"
          className="form-select"
          value={selectedGenre}
          onChange={onGenreChange}
        >
          <option value="">Todos os gêneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-sm">
        <div className="d-flex">
          <input
            id="searchInput"
            type="text"
            className="form-control me-2"
            placeholder="Buscar por título, diretor ou ator"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}