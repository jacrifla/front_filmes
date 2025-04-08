import { useEffect, useState } from "react";
import { getPopularMovies, getGenres } from "../services/tmdb";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await getPopularMovies(currentPage);
      setMovies(movieData.results);
      setTotalPages(movieData.total_pages);
    };

    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    const fetchAllGenres = async () => {
      const genreData = await getGenres();
      setGenres(genreData);
    };
  
    fetchAllGenres();
  }, []);  

  const filteredMovies = selectedGenre
    ? movies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    : movies;

  return {
    movies: filteredMovies,
    genres,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
