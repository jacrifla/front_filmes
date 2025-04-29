import React, { useState } from 'react';
import ActionButtons from './ActionButtons';
import RatingStars from './RatingStars';
import CommentBox from './CommentBox';
import MediaDetailModal from './MediaDetailModal';
import '../styles/movieCard.css';

const MediaCard = ({
  media,
  mediaType,
  isLoggedIn,
  onAdd,
  onRemove,
  handleRateMedia,
  onComment,
  userRating,
  userComment,
  watchlistStatus
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card movie-card-dark h-100 shadow-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          className={`card-img-top ${watchlistStatus === 'watched' ? 'img-watched' : ''}`}
          alt={media.title || media.name}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => setShowModal(true)}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-truncate">{media.title || media.name}</h5>
          {isLoggedIn && (
            <>
              <ActionButtons media={media} onAdd={onAdd} onRemove={onRemove} status={watchlistStatus} />
              <RatingStars
                mediaId={media.id}
                handleRateMedia={handleRateMedia}
                initialRating={userRating}
              />
              <CommentBox
                mediaId={media.id}
                initialComment={userComment}
                onSubmitComment={onComment}
              />
            </>
          )}
        </div>
      </div>

      {showModal && (
        <MediaDetailModal
          mediaId={media.id}
          mediaType={mediaType}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MediaCard;
