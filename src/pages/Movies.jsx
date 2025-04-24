import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useMovies from '../hooks/useMovies';
import MovieList from '../components/MovieList';
import ScrollToTopButton from '../components/ScrollToTopButton';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    loadMoreMovies,
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    searching,
  } = useMovies(user, token);

  if (loading && movies.length === 0)
    return <p className="text-center mt-5">Carregando filmes...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Filmes Populares</h2>

      <form onSubmit={handleSearchSubmit} className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Buscar por título, diretor ou ator"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {!searching && (
        <InfiniteScroll
          dataLength={movies.length}
          next={() => {
            setPage((prev) => prev + 1);
            loadMoreMovies();
          }}
          hasMore={page < totalPages}
          loader={<p className="text-center">Carregando mais filmes...</p>}
          endMessage={
            <p className="text-center">Você chegou ao fim da lista 🎉</p>
          }
        >
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
        </InfiniteScroll>
      )}

      {searching && (
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
      )}

      <ScrollToTopButton />
    </div>
  );
}
