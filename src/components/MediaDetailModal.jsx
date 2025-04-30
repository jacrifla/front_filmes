import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import tmdbService from '../services/tmdbService';
import '../styles/movieDetailModal.css';

const MediaDetailModal = ({ mediaId, mediaType, show, onHide }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mediaId || !mediaType) return;

    const fetchDetails = async () => {
      try {
        const getDetails = mediaType === 'movie'
          ? tmdbService.getMovieDetails
          : tmdbService.getSeriesDetails;

        const getCredits = mediaType === 'movie'
          ? tmdbService.getMovieCredits
          : tmdbService.getSeriesCredits;

        const detailsData = await getDetails(mediaId);
        const creditsData = await getCredits(mediaId);

        const director = mediaType === 'movie'
          ? creditsData.crew.find(person => person.job === 'Director')
          : null;

        setDetails({
          ...detailsData,
          cast: creditsData.cast,
          director: director?.name || 'Não disponível',
        });
      } catch (error) {
        console.error(`Erro ao buscar detalhes da ${mediaType}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [mediaId, mediaType]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="bg-dark-custom">
      <Modal.Header closeButton>
        <Modal.Title>
          {loading ? 'Carregando...' : details?.title || details?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <p>Carregando detalhes...</p>}
        {!loading && !details && <p>Erro ao carregar detalhes.</p>}
        {!loading && details && (
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${details.poster_path || details.imageUrl}`}
                alt={details.title || details.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h5 className="text-dark">Sinopse:</h5>
              <p className="text-dark">{details.overview || 'Não disponível'}</p>

              <h5 className="text-dark">Data de Lançamento:</h5>
              <p className="text-dark">
                {details.release_date || details.first_air_date
                  ? new Date(details.release_date || details.first_air_date).toLocaleDateString('pt-BR')
                  : 'Não disponível'}
              </p>

              <h5 className="text-dark">Gêneros:</h5>
              <p className="text-dark">{details.genres?.map(g => g.name).join(', ')}</p>

              {mediaType === 'movie' && (
                <>
                  <h5 className="text-dark">Diretor:</h5>
                  <p className="text-dark">{details.director}</p>
                </>
              )}

              <h5 className="text-dark">Avaliação Média (TMDB):</h5>
              <p className="text-dark">{details.vote_average?.toFixed(1)} / 10</p>

              {details.imdb_id && (
                <p>
                  <a
                    href={`https://www.imdb.com/title/${details.imdb_id || details.imdbId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no IMDb
                  </a>
                </p>
              )}

              <h5 className="text-dark">Elenco:</h5>
              <ul>
                {details.cast?.slice(0, 5).map(actor => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MediaDetailModal;
