import React from 'react';
import MediaCard from './MediaCard';

export default function MediaList({
  mediaList,
  ratings,
  user,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  handleRateMedia,
  handleComment,
  watchlistMap,
  lastMediaRef,
}) {
  return (
    <div className="row">
      {mediaList.map((media, index) => {
        const userRating = ratings.find((r) => r.tmdbId === media.id);
        const isLast = index === mediaList.length - 1;

        return (
          <div
            className="col-md-4 mb-4"
            key={`${media.id}-${index}`}
            ref={isLast ? lastMediaRef : null}
          >
            <MediaCard
              media={media}
              isLoggedIn={!!user}
              userRating={userRating?.rating || 0}
              userComment={userRating?.comment || ''}
              onAdd={handleAddToWatchlist}
              onRemove={handleRemoveFromWatchlist}
              handleRateMedia={handleRateMedia}
              onComment={handleComment}
              watchlistStatus={watchlistMap[media.id]}
            />
          </div>
        );
      })}
    </div>
  );
}
