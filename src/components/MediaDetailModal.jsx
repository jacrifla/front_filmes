import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/movieDetailModal.css';

const MediaDetailModal = ({ show, onHide, media, mediaType }) => {
  if (!media) return null;

  const {
    poster_path,
    title,
    name,
    overview,
    release_date,
    first_air_date,
    genres,
    vote_average,
    imdb_id,
    cast,
    director,
    status,
    number_of_seasons,
    number_of_episodes,
    created_by,
    networks
  } = media;

  const displayTitle = title || name;
  const displayYear = (release_date || first_air_date || '').slice(0,4);
  const displayDate = release_date || first_air_date;
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('pt-BR')
    : 'Não disponível';
  const genreList = genres?.map(g => g.name).join(', ') || 'Não disponível';
  const creators = created_by?.length
    ? created_by.map(c => c.name).join(', ')
    : 'Não disponível';
  const networkList = networks?.length
    ? networks.map(n => n.name).join(', ')
    : 'Não disponível';

  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="bg-dark-custom">
      <Modal.Header closeButton>
        <Modal.Title>
          {displayTitle}{displayYear ? ` (${displayYear})` : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={displayTitle}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h5 className="text-dark">Sinopse:</h5>
            <p className="text-dark">{overview || 'Não disponível'}</p>

            <h5 className="text-dark">Data de Lançamento:</h5>
            <p className="text-dark">{formattedDate}</p>

            <h5 className="text-dark">Gêneros:</h5>
            <p className="text-dark">{genreList}</p>

            {mediaType === 'series' && (
              <>
                <h5 className="text-dark">Status:</h5>
                <p className="text-dark">{status || 'Desconhecido'}</p>

                <h5 className="text-dark">Temporadas:</h5>
                <p className="text-dark">{number_of_seasons}</p>

                <h5 className="text-dark">Episódios:</h5>
                <p className="text-dark">{number_of_episodes}</p>

                <h5 className="text-dark">Criadores:</h5>
                <p className="text-dark">{creators}</p>

                <h5 className="text-dark">Emissora:</h5>
                <p className="text-dark">{networkList}</p>
              </>
            )}

            {mediaType === 'movie' && (
              <>
                <h5 className="text-dark">Diretor:</h5>
                <p className="text-dark">{director || 'Não disponível'}</p>
              </>
            )}

            <h5 className="text-dark">Avaliação Média (TMDB):</h5>
            <p className="text-dark">{vote_average?.toFixed(1)} / 10</p>

            {imdb_id && (
              <p>
                <a
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no IMDb
                </a>
              </p>
            )}

            <h5 className="text-dark">Elenco:</h5>
            <ul>
              {cast?.slice(0, 5).map(actor => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          </div>
        </div>
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
