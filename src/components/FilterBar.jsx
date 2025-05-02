import React from 'react';

export default function FilterBar({
  genres,
  selectedGenre,
  onGenreChange,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedYear,
  onYearChange,
}) {
  // Gera array de anos de 1900 até o ano atual, em ordem decrescente
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  return (
    <form
      onSubmit={onSearchSubmit}
      className="row gx-2 gy-2 align-items-end mb-4"
    >
      {/* Gênero */}
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

      {/* Ano */}
      <div className="col-12 col-sm-auto">
        <select
          className="form-select"
          value={selectedYear}
          onChange={onYearChange}
        >
          <option value="">Todos os anos</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Busca */}
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
