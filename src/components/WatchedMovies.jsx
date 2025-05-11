import { useState } from 'react';
import { getMovieDetails, getSeriesDetails } from '../services/tmdbService';
import MediaDetailModal from './MediaDetailModal';

export default function WatchedMovies({ media }) {
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
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          key={item.tmdbId}
        >
          <div className="card bg-secondary text-light shadow h-100 d-flex flex-column">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.imageUrl}`}
              alt={item.title}
              className="card-img-top"
              style={{ cursor: 'pointer' }}
              onClick={() => openDetailModal(item)}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
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
          <h3 className="text-light mt-4 mb-3">Filmes Assistidos</h3>
          {renderMediaGrid(movies)}
        </>
      )}

      {series.length > 0 && (
        <>
          <h3 className="text-light mt-5 mb-3">Séries Assistidas</h3>
          {renderMediaGrid(series)}
        </>
      )}

      {movies.length === 0 && series.length === 0 && (
        <p className="text-light">Você não tem filmes ou séries assistidos ainda.</p>
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
