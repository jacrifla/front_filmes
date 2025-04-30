import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useMedia from '../hooks/useMedia';
import MediaList from '../components/MediaList';
import FilterBar from '../components/FilterBar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Movies() {
  const { user, token } = useAuth();
  const {
    media,
    page,
    totalPages,
    loading,
    ratings,
    watchlistMap,
    handleAddToWatchlist,
    handleRemoveFromWatchlist,
    handleRateMedia,
    handleComment,
    setPage,
    loadMoreMedia,
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    searching,
    genres,
    handleGenreChange,
    selectedGenre,
  } = useMedia(user, token, 'movie');

  if (loading && media.length === 0)
    return <p className="text-center mt-5">Carregando filmes...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Filmes Populares</h2>

      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      {!searching && (
        <InfiniteScroll
          dataLength={media.length}
          next={() => {
            setPage((prev) => prev + 1);
            loadMoreMedia();
          }}
          hasMore={page < totalPages}
          loader={<p className="text-center">Carregando mais filmes...</p>}
          endMessage={
            <p className="text-center">Você chegou ao fim da lista 🎉</p>
          }
        >
          <MediaList
            mediaList={media}
            ratings={ratings}
            user={user}
            handleAddToWatchlist={handleAddToWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            handleRateMedia={handleRateMedia}
            handleComment={handleComment}
            watchlistMap={watchlistMap}
            mediaType='movie'
          />
        </InfiniteScroll>
      )}

      {searching && (
        <MediaList
          media={media}
          ratings={ratings}
          user={user}
          handleAddToWatchlist={handleAddToWatchlist}
          handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          handleRateMedia={handleRateMedia}
          handleComment={handleComment}
          watchlistMap={watchlistMap}
          mediaType='movie'
        />
      )}

      <ScrollToTopButton />
    </div>
  );
}