import React from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import GenreFilter from "../components/GenreFilter";
import Pagination from "../components/Pagination";

function Home() {
  const {
    movies,
    genres,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useMovies();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bem-vinda, {user?.nome || "Usuária"}!</h2>
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
