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
  } = useMovies(user, token);

  if (loading && movies.length === 0)
    return <p className="text-center mt-5">Carregando filmes...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Filmes Populares</h2>

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

      <ScrollToTopButton />
    </div>
  );
}
