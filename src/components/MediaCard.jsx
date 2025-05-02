import React, { useEffect, useState } from 'react';
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
  watchlistStatus,
  getMediaDetails,
  mediaDetails,
}) => {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getMediaDetails(media.id);
      if (details) {
        setSelectedDetail(details);
      }
    };

    fetchDetails();
  }, [media.id, getMediaDetails]);

  return (
    <>
      <div className="card movie-card-dark h-100 shadow-lg position-relative">
        {mediaType === 'series' && selectedDetail?.status && (
          <div
            className={`ribbon ${selectedDetail.status
              .replace(/\s+/g, '-')
              .toLowerCase()}`}
          >
            <span>{selectedDetail.status}</span>
          </div>
        )}

        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          className={`card-img-top ${
            watchlistStatus === 'watched' ? 'img-watched' : ''
          }`}
          alt={media.title || media.name}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'scale(1.05)')
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-truncate">
            {media.title || media.name}
          </h5>
          {isLoggedIn && (
            <>
              <ActionButtons
                media={media}
                onAdd={onAdd}
                onRemove={onRemove}
                status={watchlistStatus}
              />
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
          media={selectedDetail}
          mediaType={mediaType}
          show={showModal}
          onHide={() => setShowModal(false)}
          mediaDetails={mediaDetails}
        />
      )}
    </>
  );
};

export default MediaCard;
