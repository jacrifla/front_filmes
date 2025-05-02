import React from 'react';
import { useAuth } from '../hooks/useAuth';
import useMedia from '../hooks/useMedia';
import MediaList from '../components/MediaList';
import FilterBar from '../components/FilterBar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container } from 'react-bootstrap';

export default function Series() {
  const { user, token } = useAuth();
  const {
    media: series,
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
    getMediaDetails,
    mediaDetails,
    selectedYear,
    handleYearChange,
  } = useMedia(user, token, 'series');

  if (loading && series.length === 0)
    return <p className="text-center mt-5">Carregando séries...</p>;

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Séries Populares</h2>

      <FilterBar
        genres={genres}
        onYearChange={handleYearChange}
        onGenreChange={handleGenreChange}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
      />

      {!searching && (
        <InfiniteScroll
          dataLength={series.length}
          next={() => {
            setPage((prev) => prev + 1);
            loadMoreMedia();
          }}
          hasMore={page < totalPages}
          loader={<p className="text-center">Carregando mais séries...</p>}
          endMessage={
            <p className="text-center">Você chegou ao fim da lista 🎉</p>
          }
        >
          <MediaList
            mediaList={series}
            ratings={ratings}
            user={user}
            handleAddToWatchlist={handleAddToWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            handleRateMedia={handleRateMedia}
            handleComment={handleComment}
            watchlistMap={watchlistMap}
            mediaType="series"
            getMediaDetails={getMediaDetails}
            mediaDetails={mediaDetails}
          />
        </InfiniteScroll>
      )}

      {searching && (
        <MediaList
          mediaList={series}
          ratings={ratings}
          user={user}
          handleAddToWatchlist={handleAddToWatchlist}
          handleRemoveFromWatchlist={handleRemoveFromWatchlist}
          handleRateMedia={handleRateMedia}
          handleComment={handleComment}
          watchlistMap={watchlistMap}
          mediaType="series"
          getMediaDetails={getMediaDetails}
          mediaDetails={mediaDetails}
        />
      )}

      <ScrollToTopButton />
    </Container>
  );
}
