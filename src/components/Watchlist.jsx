import { useState } from 'react';
import { getMovieDetails, getSeriesDetails } from '../services/tmdbService';
import MediaDetailModal from './MediaDetailModal';
import ActionButtons from './ActionButtons';

export default function Watchlist({ media, onAdd, onRemove }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mediaType, setMediaType] = useState(null);

  const openDetailModal = async (item) => {
    try {
      const tmdbData =
        item.type === 'movie'
          ? await getMovieDetails(item.tmdbId)
          : await getSeriesDetails(item.tmdbId);

      setSelectedMedia(tmdbData);
      setMediaType(item.type);
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes:', err);
    }
  };

  const movies = media.filter((item) => item.type === 'movie');
  const series = media.filter((item) => item.type === 'series');

  const renderMediaGrid = (items) => (
    <div className="row">
      {items.map((item) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
          <div className="card bg-dark text-light shadow h-100 d-flex flex-column">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.imageUrl}`}
              alt={item.title}
              className="card-img-top"
              style={{ cursor: 'pointer' }}
              onClick={() => openDetailModal(item)}
            />
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">{item.title}</h5>
              <ActionButtons
                media={item}
                onAdd={onAdd}
                onRemove={onRemove}
                status={item.status}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {movies.length > 0 && (
        <>
          <h3 className="text-light mt-4 mb-3">Filmes</h3>
          {renderMediaGrid(movies)}
        </>
      )}
      {series.length > 0 && (
        <>
          <h3 className="text-light mt-5 mb-3">Séries</h3>
          {renderMediaGrid(series)}
        </>
      )}

      <MediaDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        media={selectedMedia}
        mediaType={mediaType}
      />
    </>
  );
}
